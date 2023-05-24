import mongoose from "mongoose";

const CandidateGroupSchema = new mongoose.Schema({
  president: [],
  vicePresident: [],
  AGS: [],
  sport: [],
  gensec: [],
  social: [],
  pro: [],
  finsec: [],
  treasurer: [],
});

export const Groups = mongoose.model("CandidateGroup", CandidateGroupSchema);
