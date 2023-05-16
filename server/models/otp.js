import mongoose from "mongoose";

const OTPschema = new mongoose.Schema(
  {
    otp: {
      type: Number,
      //   required: [true, "must enter a valid otp"],
    },
    createdAt: { type: Date, default: Date.now(), expires: 300000 },
  },
  { timestamps: true }
);

const OTP = mongoose.model("otp", OTPschema);
export default OTP;
