import bcrypt from "bcrypt";
import { pool } from "../database/userDB.js";

export async function insertUser({ fullname, user, email, password }) {
  // Verifica se já existe o email no banco
  const { rows: existing } = await pool.query(
    "SELECT * FROM user_register WHERE email = $1",
    [email]
  );

  if (existing.length > 0) {
    throw new Error("Email já cadastrado");
  }

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await pool.query(
    "INSERT INTO user_register (fullname, \"user\", email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [fullname, user, email, hashedPassword]
  );

  return rows[0];
}

export async function findUserByEmailAndPassword(email, password) {
  const { rows: results } = await pool.query(
    "SELECT * FROM user_register WHERE email = $1",
    [email]
  );

  const user = results[0];
  if (!user) return null;

  // Compara a senha
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
}

export async function findUserById(id) {
  const { rows: results } = await pool.query(
    "SELECT * FROM user_register WHERE userId = $1",
    [id]
  );
  return results[0];
}