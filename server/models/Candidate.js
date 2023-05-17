import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "you must provide a name"],
    },
    lastName: {
      type: String,
      required: [true, "must provide lastname"],
    },
    matric: {
      type: String,
      required: [true, "must provide lastname"],
    },
    level: {
      type: Number,
      required: [true, "you must provide a level"],
    },
    email: {
      type: String,
      required: [true, "Must provide a valid email"],
      validate: {
        validator: function (value) {
          // Regular expression pattern for email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    phone: {
      type: Number,
      required: [true, "must provide a valid phone"],
    },
    office: {
      type: String,
      required: [true, "must state you office"],
    },
    description: {
      type: String,
      required: [true, "must decribe your office"],
    },
  },
  { timestamps: true }
);

const Runner = mongoose.model("Candidate", CandidateSchema);
export default Runner;
