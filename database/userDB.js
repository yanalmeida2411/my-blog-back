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

export async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM blogshop_db.user_register");
  return rows;
}

export async function getUser(id) {
  const [rows] = await pool.query(
    `
    SELECT * FROM blogshop_db.user_register WHERE userId = ?`,
    [id]
  );
  return rows[0];
}

export async function createLogin(email, password) {
  const [rows] = await pool.query(
    `
    SELECT * FROM blogshop_db.user_register WHERE email = ? AND password = ?`,
    [email, password]
  );
  return rows[0];
}

export async function createUser(
  fullname,
  user,
  email,
  password,
) {
  const [rows] = await pool.query(
    `
    INSERT INTO blogshop_db.user_register (fullname, user, email, password)
    VALUES (?, ?, ?, ? )`,
    [fullname, user, email, password]
  );
  const id = rows.insertId;
  return getUser(id);
}
