import BICS from "../models/BIC.js";

const CreateVoter = async (req, res) => {
  try {
    const BIC = BICS.BIC;
    const { firstName, lastName, email, matric } = req.body;
    const newVoter = await new BIC({
      firstName,
      lastName,
      email,
      matric,
    });
    if (!firstName || !lastName || !matric || !email) {
      res.status(401).send("Supply all credentials");
    } else {
      const existingVoter = await BIC.find({ matric });
      if (existingVoter) {
        res.status(403).send("Voter has already been registered");
      } else {
        const createdVoter = await newVoter.save();
        if (createdVoter) {
          res.status(200).send(createdVoter);
        } else {
          res.status(401).send("failed to create User");
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export default CreateVoter;
