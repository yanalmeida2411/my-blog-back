import express from "express";
import {
  followUser,
  unfollowUser,
  listFollowing,
  listFollowers,
} from "../controllers/followController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/follow", authenticateToken, followUser);
router.post("/unfollow", authenticateToken, unfollowUser);
router.get("/following/:userId", authenticateToken, listFollowing);
router.get("/followers/:userId", authenticateToken, listFollowers);

export default router;
