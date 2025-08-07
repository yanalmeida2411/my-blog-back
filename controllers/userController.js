import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  insertUser,
  findUserByEmailAndPassword,
} from "../services/userService.js";

dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  const { fullname, user, email, password } = req.body;

  try {
    const newUser = await insertUser({ fullname, user, email, password });
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err.message); // como "Email já cadastrado"
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmailAndPassword(email, password);

  if (!user) {
    return res.status(401).send("Email ou senha inválidos");
  }

  const token = jwt.sign(
    { userId: user.userId, email: user.email, fullname: user.fullname },
    SECRET,
    { expiresIn: "1h" }
  );

  // Seta cookie de forma compatível com mobile
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/", // cookie enviado em todas as rotas
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
    })
    .json({ userId: user.userId, fullname: user.fullname });
};

export const profileUser = async (req, res) => {
  const { userId } = req.user;

  const requestedUserId = parseInt(req.params.userId); // da URL

  if (userId !== requestedUserId) {
    return res.status(403).send("Acesso negado: usuário inválido.");
  }

  // Aqui você pode retornar os dados do usuário logado
  res.json({
    message: "Usuário autenticado com sucesso",
    userId: userId,
    fullname: req.user.fullname,
    email: req.user.email,
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).send("Logout realizado");
};
