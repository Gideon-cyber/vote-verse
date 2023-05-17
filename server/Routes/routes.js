import express from "express";
import { VerifyUser } from "../controllers/verifyUser.js";
import { UpdateThisUser } from "../controllers/Updateuser.js";
import { FindThisUser } from "../controllers/findthisuser.js";
import { findAllUsers } from "../controllers/findAllUser.js";
import CreateVoter from "../controllers/newUser.js";
import CreateNewCandidate from "../controllers/newCandidate.js";
import { getOTP } from "../controllers/OTP.js";
import { VerifyOTP } from "../controllers/OTP.js";

const router = express.Router();

router.post("/verifyUser", VerifyUser);
router.post("/updateThisUser", UpdateThisUser);
router.post("/findThisUser", FindThisUser);
router.post("/register", CreateVoter);
router.post("/candidate", CreateNewCandidate);
router.post("/getotp", getOTP);
router.post("/verifyotp", VerifyOTP);
router.get("/findAllUsers", findAllUsers);

export default router;
