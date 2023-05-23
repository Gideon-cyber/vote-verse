import BICS from "../models/BIC.js";
import { Admin } from "../models/admin.js";
import { BICSTUDENTS } from "../SampleData/sampledata.js";
const CreateVoter = async (req, res) => {
  try {
    //const load = BICSTUDENTS.map(
    // async ({ firstName, lastName, email, matric, admin }) => {
    const BIC = BICS.BIC;
    const { firstName, lastName, email, matric, admin } = req.body;
    // console.log(req.body);
    const newVoter = await new BIC({
      firstName,
      lastName,
      email,
      matric,
    });
    if (!firstName || !lastName || !matric || !email) {
      res.status(401).send({ message: "Supply all credentials" });
    } else {
      const existingVoter = await BIC.find({ matric });
      // console.log(existingVoter);
      if (existingVoter.length !== 0) {
        res.status(403).send({ message: "Voter has already been registered" });
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
        // console.log(adminThatCreatedThisVoter);
        if (adminThatCreatedThisVoter) {
          res.status(200).send({
            message: "Successfully created",
            createdVoter: createdVoter,
            creator: adminThatCreatedThisVoter,
          });
          console.log("Success");
        } else {
          res.status(401).send({ message: "failed to create User" });
        }
      }
    }
    //   }
    // );
  } catch (err) {
    console.error(err);
  }
};

export default CreateVoter;

// export const FindAdminRegisteredVoters = async (req, res) => {
//   const { admin } = req.body;
//   try {
//     const findAdmin = await Admin.findOne({ matric: admin });
//     console.log(findAdmin);
//     if (findAdmin) {
//       res.status(200).send(findAdmin.registeredVoters);
//     } else {
//       res.status(404).send({ message: "admin not found" });
//     }
//   } catch (err) {
//     res.status(404).send({
//       message: err.message,
//     });
//   }
// };

export const FindAdminRegisteredVoters = async (req, res) => {
  try {
    //find this user in question
    const { admin } = req.body;
    //const user = await User.find({ email });
    const findAdmin = await Admin.findOne({ matric: admin });
    console.log(findAdmin);

    if (findAdmin) {
      const AdminregVoters = findAdmin.registeredVoters;
      // console.log(AdminregVoters);
      const votersArray = await Promise.all(
        AdminregVoters.map((_id) => BICS.BIC.find(_id))
      );

      const foundVoters = votersArray.map((el) => el[0]);

      // console.log(foundVoters);
      res.status(200).json({ voters: foundVoters, number: foundVoters.length });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
