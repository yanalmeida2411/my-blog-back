import {
  findAllPosts,
  findPostById,
  insertPost,
  removePost,
} from "../database/postDB.js";

export const getAllPosts = () => findAllPosts();

export const getPostById = (id) => findPostById(id);

export const createNewPost = (title, resume, content, authorId, authorName) =>
  insertPost(title, resume, content, authorId, authorName);

export const deletePostById = (id) => removePost(id);
