import express from "express";
import {
  loginUser,
  registerUser,
  profileUser,
  logoutUser,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/blog/:userId", authenticateToken, profileUser);
router.post("/logout", logoutUser);
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    userId: req.user.id,
    fullname: req.user.fullname,
    email: req.user.email,
  });
});

export default router;
