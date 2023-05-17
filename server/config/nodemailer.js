import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//I am making this component reuseable by making it take 3 customizable arguments
const mailer = (mail, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_MAIL,
      pass: process.env.AUTH_PASS
    }
  });

  const mailOptions = {
    from: "patoctave99@gmail.com",
    to: mail,
    subject: subject,
    text: text
  };

  transporter
    .sendMail(mailOptions)
    .then(() => console.log("mail sent successfully"))
    .catch((error) => console.log(error));
};

export default mailer;
