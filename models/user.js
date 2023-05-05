import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },

  matric: {
    type: Number,
    required: [true, "Please provide a matriculation number"],
  },
  president: {
    type: String,
  },
  gensec: {
    type: String,
  },
  author: {
    type: String,
  },
  sport: {
    type: String,
  },
});

const BIC = mongoose.model("BIC", UserSchema);
export default BIC;
