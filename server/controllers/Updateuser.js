import BICS from "../models/BIC.js";

export const UpdateThisUser = async (req, res) => {
  try {
    const BIC = BICS.BIC;
    const {
      matric,
      candidate1,
      candidate2,
      candidate3,
      candidate4,
      candidate5,
      candidate6,
      candidate7,
      candidate8,
      candidate9,
    } = req.body;
    console.log(req.body);
    const isVoted = await BIC.findOne({ matric });
    console.log(isVoted);
    if (isVoted.Voted === true) {
      res.status(403).send({
        message: "You have already voted",
        status: isVoted,
      });
    } else {
      const filter = { matric: matric };
      const update = {
        $set: {
          president: candidate1 ? candidate1 : null,
          vicePresident: candidate2 ? candidate2 : null,
          sport: candidate3 ? candidate3 : null,
          gensec: candidate4 ? candidate4 : null,
          social: candidate5 ? candidate5 : null,
          pro: candidate6 ? candidate6 : null,
          finsec: candidate7 ? candidate7 : null,
          treasurer: candidate8 ? candidate8 : null,
          AGS: candidate9 ? candidate9 : null,
          Voted: true,
        },
      };
      const options = { new: true };
      const updatedUser = await BIC.findOneAndUpdate(filter, update, options);
      console.log(updatedUser);
      if (updatedUser) {
        res
          .status(200)
          .send({ message: "You have successfully voted", voter: updatedUser });
        // res.status(200).send(updatedUser);
      } else {
        res.status(404).send({ message: "No Such User Found" });
      }
    }
  } catch (err) {
    console.error(err);
  }
};
