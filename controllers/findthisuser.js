import BICS from "../models/BIC.js";

export const FindThisUser = async (req, res) => {
  const { parameter } = req.body;
  console.log(parameter);
  const BIC = BICS.BIC;
  const foundThisUser = await BIC.find({
    $or: [
      { firstName: parameter },
      { lastName: parameter },
      { email: parameter },
      { president: parameter },
      { gensec: parameter },
      { matric: parameter },
      { sport: parameter },
      { vicePresident: parameter },
      { social: parameter },
      { finsec: parameter },
      { treasurer: parameter },
      { AGS: parameter },
    ],
    $and: [
      { president: { $ne: null } },
      { gensec: { $ne: null } },
      { author: { $ne: null } },
      { sport: { $ne: null } },
      { vicePresident: { $ne: null } },
      { social: { $ne: null } },
      { finsec: { $ne: null } },
      { treasurer: { $ne: null } },
      { AGS: { $ne: null } },
    ],
  });

  if (foundThisUser.length > 0) {
    console.log(foundThisUser);
    res.status(200).json(foundThisUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
