import express from "express";
import { VerifyUser } from "../controllers/verifyUser.js";
import { UpdateThisUser } from "../controllers/Updateuser.js";
import { FindThisUser } from "../controllers/findthisuser.js";
import { findAllUsers } from "../controllers/findAllUser.js";

const router = express.Router();

router.post("/verifyUser", VerifyUser);
router.post("/updateThisUser", UpdateThisUser);
router.post("/findThisUser", FindThisUser);
router.get("/findAllUsers", findAllUsers);

export default router;
