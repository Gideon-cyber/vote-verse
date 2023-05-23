import { Admin } from "../models/admin.js";
import BICS from "../models/BIC.js";
import OTP from "../models/otp.js";
import mailer from "../config/nodemailer.js";

const AdminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(401).send("Wrong email/password");
    } else {
      const FindThisAdmin = await Admin.findOne({
        email: email,
        password: password,
      });
      console.log(FindThisAdmin);
      if (FindThisAdmin.length != 0) {
        const min = 1000;
        const max = 9999;
        const otp = Math.floor(Math.random() * (max - min + 1)) + min;
        const newOTP = await new OTP({
          otp,
        });

        const sentOTP = await newOTP.save();
        console.log(sentOTP);
        mailer(email, "please Verify using the OTP code ", otp.toString());
        return res.status(201).send({
          success: true,
          message: " Check your email for otp",
          otp: otp,
          admin: FindThisAdmin,
        });
      } else {
        res.status(401).send("Admin not found");
      }
    }
  } catch (err) {
    res.status(401).send(err.message);
    console.log(err.message);
  }
};

export default AdminLogin;

export const VoterLogin = async (req, res) => {
  const BIC = BICS.BIC;
  const { matric, email } = req.body;
  try {
    if (!matric) {
      res.status(401).send({message:"Wrong email/password"});
    } else {
      const FindThisVoter = await BIC.findOne({
        matric: matric,
      });

      const email = FindThisVoter.email;
      console.log(FindThisVoter);
      console.log(email);

      if (FindThisVoter) {
        if (FindThisVoter.Accredited === null) {
          res.status(403).send({
            message: "Sorry, you are not Accreditd to vote",
          });
        } else {
          const min = 1000;
          const max = 9999;
          const otp = Math.floor(Math.random() * (max - min + 1)) + min;
          const newOTP = await new OTP({
            otp,
          });

          const sentOTP = await newOTP.save();
          console.log(sentOTP);
          mailer(email, "please Verify using the OTP code ", otp.toString());
          return res.status(201).send({
            success: true,
            message: " Check your email for otp",
            otp: otp,
            voter: FindThisVoter,
          });
        }
      } else {
        res.status(401).send({message:"Voter not found"});
      }
    }
  } catch (err) {
    res.status(401).send(err.message);
    console.log(err.message);
  }
};
