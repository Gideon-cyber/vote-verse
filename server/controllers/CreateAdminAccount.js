import { Admin } from "../models/admin.js";

const CreateAdmin = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    matric,
    Department,
    gender,
    phoneNumber,
  } = req.body;

  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !matric ||
      !Department
    ) {
      res.status(401).send({ message: "you must provide all details" });
    } else {
      const newAdmin = await new Admin({
        firstName,
        lastName,
        email,
        password,
        matric,
        Department,
        gender,
        phoneNumber,
      });
      const registeredAdmin = await newAdmin.save();

      res.status(200).send({
        message: "admin created",
        identity: registeredAdmin,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send(err.message);
  }
};

export default CreateAdmin;
