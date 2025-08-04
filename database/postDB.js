import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false } // Render exige SSL
});

export async function findAllPosts() {
  const { rows } = await pool.query(`
    SELECT p.*, u.fullname AS author_name
    FROM posts p
    JOIN user_register u ON p.post_authorId = u.userId
    ORDER BY p.post_date DESC
  `);
  return rows;
}

export async function findPostById(postId) {
  const { rows } = await pool.query(
    `
    SELECT p.*, u.fullname AS author_name
    FROM posts p
    JOIN user_register u ON p.post_authorId = u.userId
    WHERE p.post_id = $1
  `,
    [postId]
  );
  return rows[0];
}

export async function insertPost(post_title, post_resume, post_content, post_authorId, post_authorName) {
  const { rows } = await pool.query(
    `
    INSERT INTO posts (post_title, post_resume, post_content, post_authorId, post_authorName)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    [post_title, post_resume, post_content, post_authorId, post_authorName]
  );
  return rows[0];
}

export async function removePost(postId) {
  const result = await pool.query(
    `DELETE FROM posts WHERE post_id = $1`,
    [postId]
  );
  return result.rowCount > 0;
}

export async function getPostsByAuthorId(authorId) {
  const { rows } = await pool.query(
    `SELECT p.*, u.fullname AS author_name
     FROM posts p
     JOIN user_register u ON p.post_authorId = u.userId
     WHERE p.post_authorId = $1
     ORDER BY p.post_date DESC`,
    [authorId]
  );
  return rows;
}
