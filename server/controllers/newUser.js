import BICS from "../models/BIC.js";
import { Admin } from "../models/admin.js";

const CreateVoter = async (req, res) => {
  try {
    const BIC = BICS.BIC;
    const { firstName, lastName, email, matric, admin } = req.body;
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
      // console.log(existingVoter);
      if (existingVoter.length !== 0) {
        res.status(403).send("Voter has already been registered");
      } else {
        const createdVoter = await newVoter.save();

        //now let us find which Admin created this user and then update him

        const query = { matric: admin };
        const upate = {
          $push: {
            registeredVoters: createdVoter,
          },
        };
        const option = {
          upsert: true,
        };
        const adminThatCreatedThisVoter = await Admin.findOneAndUpdate(
          query,
          upate,
          option
        );

        if (createdVoter) {
          res.status(200).send({
            createdVoter: createdVoter,
            creator: adminThatCreatedThisVoter,
          });
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

export const FindAdminRegisteredVoters = async (req, res) => {
  const { admin } = req.body;
  try {
    const findAdmin = await Admin.findOne({ matric: admin });
    console.log(findAdmin);
    if (findAdmin) {
      res.status(200).send(findAdmin.registeredVoters);
    } else {
      res.status(404).send("admin not found");
    }
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
};
