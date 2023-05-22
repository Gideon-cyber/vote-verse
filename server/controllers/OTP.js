import BICS from "../models/BIC.js";
import OTP from "../models/otp.js";
import mailer from "../config/nodemailer.js";

export const getOTP = async (req, res) => {
  try {
    const { matric } = req.body;
    const BIC = BICS.BIC;
    if (!matric) {
      res.status(400).send("please Provide your matric");
    } else {
      const Voter = await BIC.find({ matric });
      // console.log(Voter)
      const email = Voter[0].email;
      console.log(email);
      const min = 1000;
      const max = 9999;
      const otp = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log(otp);
      if (Voter) {
        const newOTP = await new OTP({
          otp,
        });
        const sentOTP = await newOTP.save();
        mailer(email, "please Verify using the OTP code ", otp.toString());
        return res.status(201).send({
          success: true,
          message: " Check your email for Verification link",
          otp: otp,
          user: Voter,
        });
      } else {
        return res.status(401).send("voter not found");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(402).send({
      success: false,
      message: "Failed to send OTP..Voter not found",
    });
  }
};

export const VerifyOTP = async (req, res) => {
  //you know what happens here?
  //the matric no in the user obj i passed u in getOTP, you pass it back to me in this route
  //i send otp to the person using the matric number to find them and their mail
  //then when they come to this route to verify
  // if they are sucessfull, i update them as accredited
  //on successful accreditation, i delet the opt
  //if they are accredited already, i tell them

  try {
    const { matric, otp } = req.body;
    if (!matric) {
      res.status(403).send("missing parameter");
    } else {
      const foundOTP = await OTP.find({ otp });
      if (foundOTP.length != 0) {
        const filter = { matric: matric };
        const update = {
          $set: {
            Accredited: true,
          },
        };
        const options = { new: true };
        const checkIfUserIsAccredited = await BICS.BIC.findOne(filter);
        if (checkIfUserIsAccredited.Accredited) {
          res.status(403).send({
            message: "you are already accredited",
            user: checkIfUserIsAccredited,
          });
        } else {
          const AccreditedUser = await BICS.BIC.findOneAndUpdate(
            filter,
            update,
            options
          );
          const deletedOTP = await OTP.findOneAndDelete({ otp });
          console.log(deletedOTP);
          res.status(201).send({
            message:
              "Verification was successful, you are now being accredited",
            accreditedUser: AccreditedUser,
          });
        }
      } else {
        res.status(401).send("otp is invalid or expired, please try again");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(402).send({
      success: false,
      message: "OTP could not be verified",
    });
  }
};
