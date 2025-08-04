import { pool } from "../database/userDB.js";

export async function insertFollow(follower_id, following_id) {
  // Evita que o usuário siga ele mesmo
  if (follower_id === following_id) {
    throw new Error("Você não pode seguir a si mesmo");
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO follow_status (follower_id, following_id) VALUES (?, ?)`,
      [follower_id, following_id]
    );
    return result;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new Error("Você já segue esse usuário");
    }
    throw error;
  }
}

export async function deleteFollow(follower_id, following_id) {
  const [result] = await pool.query(
    `DELETE FROM follow_status WHERE follower_id = ? AND following_id = ?`,
    [follower_id, following_id]
  );
  return result;
}

export async function getFollowing(userId) {
  // Retorna lista de usuários que o userId está seguindo
  const [rows] = await pool.query(
    `
    SELECT u.userId, u.fullname, u.user 
    FROM follow_status f
    JOIN user_register u ON f.following_id = u.userId
    WHERE f.follower_id = ?
  `,
    [userId]
  );
  return rows;
}

export async function getFollowers(userId) {
  // Retorna lista de usuários que seguem o userId
  const [rows] = await pool.query(
    `
    SELECT u.userId, u.fullname, u.user 
    FROM follow_status f
    JOIN user_register u ON f.follower_id = u.userId
    WHERE f.following_id = ?
  `,
    [userId]
  );
  return rows;
}
