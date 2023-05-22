import Runner from "../models/Candidate.js";

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
      res.status(401).send("You must provide all credentials");
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
      const registeredCandidate = await newCandidate.save();
      res.status(201).send(registeredCandidate);
    }
  } catch (err) {
    console.log(err);
  }
};

export default CreateNewCandidate;
