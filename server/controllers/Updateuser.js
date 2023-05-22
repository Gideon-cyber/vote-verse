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
          president: candidate1,
          vicePresident: candidate2,
          sport: candidate3,
          gensec: candidate4,
          social: candidate5,
          pro: candidate6,
          finsec: candidate7,
          treasurer: candidate8,
          AGS: candidate9,
          Voted: true,
        },
      };
      const options = { new: true };
      const updatedUser = await BIC.findOneAndUpdate(filter, update, options);
      console.log(updatedUser);
      if (updatedUser) {
        res.status(200).send(updatedUser);
      } else {
        res.status(404).send("No Such User Found");
      }
    }
  } catch (err) {
    console.error(err);
  }
};
