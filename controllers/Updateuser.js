import BIC from "../models/user.js";

export const UpdateThisUser = async (req, res) => {
  try {
    const { whoToFind, canditate1, canditate2, canditate3, canditate4 } =
      req.body;
      console.log(req.body);
    const filter = { matric: whoToFind };
    const update = {
      $set: {
        president: canditate1,
        gensec: canditate2,
        author: canditate3,
        sport: canditate4,
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
  } catch (err) {
    console.error(err);
  }
};
