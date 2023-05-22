import Runner from "../models/Candidate.js";

export const findAllCandidates = async (req, res) => {
  const AllUser = await Runner.find();
  if (AllUser) {
    res.status(200).send(AllUser);
  } else {
    res.status(404).send({ message: "No users found" });
  }
};
