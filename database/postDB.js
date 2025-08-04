import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

export async function findAllPosts() {
  const [rows] = await pool.query(`
    SELECT p.*, u.fullname AS author_name
    FROM blogshop_db.posts p
    JOIN blogshop_db.user_register u ON p.post_authorId = u.userId
    ORDER BY p.post_date DESC
  `);
  return rows;
}

export async function findPostById(postId) {
  const [rows] = await pool.query(
    `
    SELECT p.*, u.fullname AS author_name
    FROM blogshop_db.posts p
    JOIN blogshop_db.user_register u ON p.post_authorId = u.userId
    WHERE p.post_id = ?
  `,
    [postId]
  );
  return rows[0];
}

export async function insertPost(post_title, post_resume, post_content, post_authorId , post_authorName) {
  const [result] = await pool.query(
    `
    INSERT INTO blogshop_db.posts (post_title, post_resume, post_content, post_authorId , post_authorName)
    VALUES (?, ?, ?, ? , ?)
  `,
    [post_title, post_resume, post_content, post_authorId , post_authorName]
  );
  return findPostById(result.insertId);
}

export async function removePost(postId) {
  const [result] = await pool.query(
    `DELETE FROM blogshop_db.posts WHERE post_id = ?`,
    [postId]
  );
  return result.affectedRows > 0;
}

export async function getPostsByAuthorId(authorId) {
  const [rows] = await pool.query(
    `SELECT p.*, u.fullname AS author_name
     FROM posts p
     JOIN user_register u ON p.post_authorId = u.userId
     WHERE p.post_authorId = ?
     ORDER BY p.post_date DESC`,
    [authorId]
  );
  return rows;
}