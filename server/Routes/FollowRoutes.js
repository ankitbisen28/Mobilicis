import express from "express";
import { follow, unfollow } from "../Controller/FollowFollowing.js";

const router = express.Router();

// http://localhost:5000/api
router.post("/follow/:userId", follow);
router.post("/unfollow/:userId", unfollow);

export default router;
