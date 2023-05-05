import BIC from "../models/BIC.js";
export const VerifyUser = async (req, res) => {
  try {
    const { matric } = req.body;
    const FindUser = BIC.find({ matric: matric });

    const FoundUser = await FindUser;
    if (FoundUser) {
      res.status(200).send(FoundUser);
    } else {
      res.status(404).send("No Such User Found");
    }
  } catch (err) {
    console.error(err);
  }
};
