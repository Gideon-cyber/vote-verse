import BIC from "../models/BIC.js";

export const findAllUsers = async (req, res) => {
  const AllUser = await BIC.find();
  if (AllUser) {
    res.status(200).send(AllUser);
  } else {
    res.status(404).send({ message: "No users found" });
  }
};
