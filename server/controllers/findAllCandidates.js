import Runner from "../models/Candidate.js";


export const findAllCandidates = async (req, res) => {
  const AllUser = await Runner.find();
  if (AllUser) {
    const sortResponse = AllUser.sort((a, b) =>
      a.office.localeCompare(b.office)
    );
    const categorizedResponse = AllUser.reduce((acc, obj) => {
      const office = obj.office;
      if (!acc[office]) {
        acc[office] = [];
      }
      acc[office].push(obj);
      return acc;
    }, {});

    // The categorized response
    // console.log(categorizedResponse);
    res.status(200).send(categorizedResponse);
  } else {
    res.status(404).send({ message: "No users found" });
  }
};
