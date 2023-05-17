import mongoose from "mongoose";

export const nigeriaOffset = 60 * 60 * 1000 * 1;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 8,
      maxlength: 100,
      select: false,
    },
    matric: {
      type: Number,
      unique: true,
    },
    Department: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "BAMSSA",
    },
    profileImageURL: {
      type: String,
    },
    gender: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },

    role: {
      type: String,
      default: "admin",
      enum: ["superadmin", "admin"],
      required: true,
    },
    lastLogIn: {
      type: Date,
    },
    verified: {
      type: Boolean,
      default: null,
    },
  },

  {
    timestamps: { currentTime: () => Date.now() + nigeriaOffset },
  } // set timestamps to nigerian timezone
);
export const User = mongoose.model("User", UserSchema);
