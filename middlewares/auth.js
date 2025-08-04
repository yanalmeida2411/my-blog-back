import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // pegar o token do cookie

  if (!token) return res.status(401).send("Token não fornecido");

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).send("Token inválido ou expirado");
    req.user = user;
    next();
  });
};