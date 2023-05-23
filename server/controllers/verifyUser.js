import BICS from "../models/BIC.js";
export const VerifyUser = async (req, res) => {
  try {
    const BIC = BICS.BIC;
    const { matric } = req.body;
    // console.log(matric);
    const FindUser = await BIC.find({ matric: matric });

    if (FindUser.length != 0) {
      console.log(FindUser);
      res.status(200).send(FindUser);
    } else {
      res.status(404).send({ message: "No Such User Found" });
    }
  } catch (err) {
    console.error(err);
  }
};
