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
  ssl: { rejectUnauthorized: false }
});

export async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM user_register");
  return rows;
}

export async function getUser(id) {
  const { rows } = await pool.query(
    `SELECT * FROM user_register WHERE "userId" = $1`,
    [id]
  );
  return rows[0];
}

export async function createLogin(email, password) {
  const { rows } = await pool.query(
    `SELECT * FROM user_register WHERE email = $1 AND password = $2`,
    [email, password]
  );
  return rows[0];
}

export async function createUser(fullname, user, email, password) {
  const { rows } = await pool.query(
    `INSERT INTO user_register (fullname, "user", email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [fullname, user, email, password]
  );
  return rows[0];
}
