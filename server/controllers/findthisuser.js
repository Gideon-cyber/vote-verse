import BICS from "../models/BIC.js";

export const FindThisUser = async (req, res) => {
  const { parameter } = req.body;
  console.log(parameter);
  const BIC = BICS.BIC;
  try {
    const foundThisUser = await BIC.findOne({
      $or: [
        { firstName: { $regex: parameter, $options: "i" } },
        { lastName: { $regex: parameter, $options: "i" } },
        { email: { $regex: parameter, $options: "i" } },
        { president: { $regex: parameter, $options: "i" } },
        { gensec: { $regex: parameter, $options: "i" } },
        { matric: { $regex: parameter, $options: "i" } },
        { sport: { $regex: parameter, $options: "i" } },
        { vicePresident: { $regex: parameter, $options: "i" } },
        { president: { $regex: parameter, $options: "i" } },
        { gensec: { $regex: parameter, $options: "i" } },
        { pro: { $regex: parameter, $options: "i" } },
        { social: { $regex: parameter, $options: "i" } },
        { finsec: { $regex: parameter, $options: "i" } },
        { treasurer: { $regex: parameter, $options: "i" } },
        { AGS: { $regex: parameter, $options: "i" } },
      ],
    });

    if (foundThisUser) {
      console.log(foundThisUser);
      res.status(200).json(foundThisUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: err.message });
  }
};
