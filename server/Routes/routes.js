import express from "express";
import { VerifyUser } from "../controllers/verifyUser.js";
import { UpdateThisUser } from "../controllers/Updateuser.js";
import { FindThisUser } from "../controllers/findthisuser.js";
import { findAllUsers } from "../controllers/findAllUser.js";
import CreateVoter from "../controllers/newUser.js";
import CreateNewCandidate from "../controllers/newCandidate.js";
import { getOTP } from "../controllers/OTP.js";
import { VerifyOTP } from "../controllers/OTP.js";
import CreateAdmin from "../controllers/CreateAdminAccount.js";
import AdminLogin from "../controllers/loginAdminAccount.js";
import { VoterLogin } from "../controllers/loginAdminAccount.js";
import { findAllCandidates } from "../controllers/findAllCandidates.js";
import { FindAdminRegisteredVoters } from "../controllers/newUser.js";
const router = express.Router();

router.post("/verifyUser", VerifyUser); //this is an additional route to find a user by matric only
router.post("/updateThisUser", UpdateThisUser);
router.post("/findThisUser", FindThisUser);
router.post("/register", CreateVoter);
router.post("/candidate", CreateNewCandidate);
router.post("/getotp", getOTP);
router.post("/registerAdmin", CreateAdmin);
router.post("/adminLogin", AdminLogin);
router.post("/voterLogin", VoterLogin);
router.post("/verifyotp", VerifyOTP);
router.post("/findadminvoters", FindAdminRegisteredVoters);
router.get("/findAllUsers", findAllUsers);
router.get("/findAllCandidates", findAllCandidates);

export default router;
