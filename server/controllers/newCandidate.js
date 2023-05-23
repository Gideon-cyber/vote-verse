import Runner from "../models/Candidate.js";
import { Groups } from "../models/CandidatesGroup.js";
const CreateNewCandidate = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      matric,
      level,
      email,
      phone,
      office,
      description,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !matric ||
      !level ||
      !email ||
      !phone ||
      !office ||
      !description
    ) {
      res.status(401).send({ message: "You must provide all credentials" });
    } else {
      const newCandidate = await new Runner({
        firstName,
        lastName,
        matric,
        level,
        email,
        phone,
        office,
        description,
      });

      const existingCandidate = await Runner.findOne({ matric });
      console.log(existingCandidate)
      if (existingCandidate) {
        res.status(404).send({ message: "Candidate already exist" });
      } else {
        const registeredCandidate = await newCandidate.save();
        console.log(registeredCandidate);
        res.status(201).send({
          candidate: registeredCandidate,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export default CreateNewCandidate;
