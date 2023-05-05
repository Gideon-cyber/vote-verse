import BIC from "../models/user.js";
export const VerifyUser = async (req, res) => {
  try {
    const { whoToFind } = req.body;
    const FindUser = BIC.find({ matric: whoToFind });

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
