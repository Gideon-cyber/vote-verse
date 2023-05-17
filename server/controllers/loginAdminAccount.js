import { Admin } from "../models/admin.js";
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
          message: " Check your email for Verification link",
          otp: otp,
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

//Note, after this point,
// direct the admin to the verify otp page,
// if he succeeds, take him to wherever
//he should be redirected
