import express from "express";
import {
  fetchAllPosts,
  fetchPost,
  createPost,
  deletePost,
  getPostsByAuthor,
} from "../controllers/postController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", fetchAllPosts);
router.get("/author/:authorId", authenticateToken, getPostsByAuthor);
router.get("/:id", fetchPost);
router.post("/", authenticateToken, createPost);
router.delete("/:id", authenticateToken, deletePost);

export default router;
