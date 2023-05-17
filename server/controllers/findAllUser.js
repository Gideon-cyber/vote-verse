import BICS from "../models/BIC.js";

export const findAllUsers = async (req, res) => {
  const BIC = BICS.BIC;
  console.log(BICS)
  const AllUser = await BIC.find();
  if (AllUser) {
    res.status(200).send(AllUser);
  } else {
    res.status(404).send({ message: "No users found" });
  }
};
