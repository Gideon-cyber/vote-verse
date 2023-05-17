import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
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
    vicePresident: {
      type: String,
    },
    sport: {
      type: String,
    },
    social: {
      type: String,
    },
    pro: {
      type: String,
    },
    finsec: {
      type: String,
    },
    treasurer: {
      type: String,
    },
    AGS: {
      type: String,
    },
  },
  { timestamps: true }
);

// const BIC = mongoose.model("BIC", UserSchema);
// // const BIC = mongoose.model(Model, UserSchema);
// export default BIC;

const modelNames = ["BIC", "PHY", "MLS"];

const BICS = {};

// Iterate through the modelNames array and create the BIC
modelNames.forEach((modelName) => {
  BICS[modelName] = mongoose.model(modelName, UserSchema);
});

export default BICS;
