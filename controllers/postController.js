import { getPostsByAuthorId } from "../database/postDB.js";
import {
  getAllPosts,
  getPostById,
  createNewPost,
  deletePostById,
} from "../services/postService.js";

export const fetchAllPosts = async (req, res) => {
  const posts = await getAllPosts();
  res.json(posts);
};

export const fetchPost = async (req, res) => {
  const post = await getPostById(req.params.id);
  if (!post) return res.status(404).send("Post não encontrado");
  res.json(post);
};
export const getPostsByAuthor = async (req, res) => {
  
    const authorId = req.user.userId; // pega do token

  try {
    const posts = await getPostsByAuthorId(authorId);
    res.json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts por autor:", error);
    res.status(500).json({ message: "Erro ao buscar posts do autor." });
  }
};

export const createPost = async (req, res) => {
  const { post_title, post_resume, post_content } = req.body;
  const authorId = req.user.userId; // pegando do token
  const post_authorName = req.user.fullname;

  const post = await createNewPost(
    post_title,
    post_resume,
    post_content,
    authorId,
    post_authorName
  );
  res.status(201).json(post);
};

export const deletePost = async (req, res) => {
  const success = await deletePostById(req.params.id);
  if (!success) return res.status(404).send("Post não encontrado");
  res.status(204).send();
};
