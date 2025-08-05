import { pool } from "../database/userDB.js";

export async function insertFollow(follower_id, following_id) {
  if (follower_id === following_id) {
    throw new Error("Você não pode seguir a si mesmo");
  }

  try {
    const result = await pool.query(
      `INSERT INTO follow_status (follower_id, following_id) VALUES ($1, $2)`,
      [follower_id, following_id]
    );
    return result;
  } catch (error) {
    // Código Postgres para violação de restrição de unicidade é '23505'
    if (error.code === "23505") {
      throw new Error("Você já segue esse usuário");
    }
    throw error;
  }
}

export async function deleteFollow(follower_id, following_id) {
  const result = await pool.query(
    `DELETE FROM follow_status WHERE follower_id = $1 AND following_id = $2`,
    [follower_id, following_id]
  );
  return result;
}

export async function getFollowing(userId) {
  const { rows } = await pool.query(
    `
    SELECT u.userId, u.fullname, u.user 
    FROM follow_status f
    JOIN user_register u ON f.following_id = u."userId"
    WHERE f.follower_id = $1
  `,
    [userId]
  );
  return rows;
}

export async function getFollowers(userId) {
  const { rows } = await pool.query(
    `
    SELECT u.userId, u.fullname, u.user 
    FROM follow_status f
    JOIN user_register u ON f.follower_id = u."userId"
    WHERE f.following_id = $1
  `,
    [userId]
  );
  return rows;
}
