import BIC from "../models/user.js";

export const FindThisUser = async (req, res) => {
  const { parameter } = req.body;
  console.log(parameter);
  const foundThisUser = await BIC.find({
    $or: [
      { firstName: parameter },
      { lastName: parameter },
      { email: parameter },
      { president: parameter },
      { gensec: parameter },
      { author: parameter },
      { sport: parameter },
    ],
    $and: [
      { president: { $ne: null } },
      { gensec: { $ne: null } },
      { author: { $ne: null } },
      { sport: { $ne: null } },
    ],
  });

  if (foundThisUser.length > 0) {
    console.log(foundThisUser)
    res.status(200).json(foundThisUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
