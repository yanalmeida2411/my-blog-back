import bcrypt from "bcrypt";
import { pool } from "../database/userDB.js";

export async function insertUser({ fullname, user, email, password }) {
  // Verifica se já existe o email no banco
  const [existing] = await pool.query("SELECT * FROM blogshop_db.user_register WHERE email = ?", [
    email,
  ]);

  if (existing.length > 0) {
    throw new Error("Email já cadastrado");
  }

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    "INSERT INTO blogshop_db.user_register (fullname, user, email, password) VALUES (?, ?, ?, ?)",
    [fullname, user, email, hashedPassword]
  );

  return {
    fullname,
    user,
    email,
  };
}

export async function findUserByEmailAndPassword(email, password) {
  const [results] = await pool.query("SELECT * FROM blogshop_db.user_register WHERE email = ?", [
    email,
  ]);

  const user = results[0];
  if (!user) return null;

  // Compara a senha
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
}

export async function findUserById(id) {
  const [results] = await pool.query("SELECT * FROM blogshop_db.user_register WHERE userId = ?", [
    id,
  ]);
  return results[0];
}
