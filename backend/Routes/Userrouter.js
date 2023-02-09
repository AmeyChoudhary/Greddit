import express from "express" 

import { getUser , getUserFollowers , updateUserprofile} from "../Controllers/User.js";
import { verifyToken } from "../Middleware/Authentication.js";

const router = express.Router();

// router.get("/:id" , verifyToken, getUser);
// router.get("/:id/followers", verifyToken, getUserFollowers);
router.patch("/updateprofile", updateUserprofile )

export default router