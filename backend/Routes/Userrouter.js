import express from "express" 

import { getUserFollowers , updateUserprofile, getUserFollowing} from "../Controllers/User.js";
import { verifyToken } from "../Middleware/Authentication.js";

const router = express.Router();

// router.get("/:id" , verifyToken, getUser);
// router.get("/:id/followers", verifyToken, getUserFollowers);
router.patch("/updateprofile", updateUserprofile )
router.post("/followers", getUserFollowers)
router.post("/following", getUserFollowing)

export default router