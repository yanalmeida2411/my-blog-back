import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  // Pega token do cookie (desktop)
  const tokenFromCookie = req.cookies.token;

  // Pega token do header Authorization (mobile)
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader && authHeader.split(' ')[1];

  // Usa o token que existir primeiro
  const token = tokenFromCookie || tokenFromHeader;

  if (!token) return res.status(401).send("Token não fornecido");

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).send("Token inválido ou expirado");
    req.user = user;
    next();
  });
};