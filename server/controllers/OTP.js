import BICS from "../models/BIC.js";
import OTP from "../models/otp.js";
import mailer from "../config/nodemailer.js";

export const getOTP = async (req, res) => {
  try {
    const { matric } = req.body;
    const BIC = BICS.BIC;
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
      });
    } else {
      return res.status(401).send("voter not found");
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
  try {
    const { otp } = req.body;
    const foundOTP = await OTP.find({ otp });
    console.log(foundOTP);
    if (foundOTP.length !== 0) {
      res.status(201).send({
        message: "Verification was successful",
      });
      const deletedOTP = await OTP.findOneAndDelete({ otp });
      console.log(deletedOTP);
    } else {
      res.status(401).send("otp is invalid or expired, please try again");
    }
  } catch (err) {
    console.log(err);
    return res.status(402).send({
      success: false,
      message: "OTP could not be verified",
    });
  }
};
