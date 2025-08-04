import {
  insertFollow,
  deleteFollow,
  getFollowing,
  getFollowers,
} from "../services/followService.js";

export const followUser = async (req, res) => {
  const follower_id = req.user.id;
  const { following_id } = req.body;

  try {
    await insertFollow(follower_id, following_id);
    res.status(201).json({ message: "Seguindo com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  const follower_id = req.user.id;
  const { following_id } = req.body;

  try {
    await deleteFollow(follower_id, following_id);
    res.json({ message: "Deixou de seguir com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deixar de seguir" });
  }
};

export const listFollowing = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const following = await getFollowing(userId);
    res.json(following);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar lista de seguindo" });
  }
};

export const listFollowers = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const followers = await getFollowers(userId);
    res.json(followers);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar lista de seguidores" });
  }
};
