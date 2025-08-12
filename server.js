import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;

// Domínios permitidos
const allowedOrigins = [
  "http://localhost:3000",
  "https://mynetblog.netlify.app",
  "https://mynetblog.netlify.app/login",
];

// Configuração CORS para permitir cookies
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middlewares padrão
app.use(cookieParser());
app.use(express.json());

// Rotas
app.use("/follows", followRoutes);
app.use("/", userRoutes);
app.use("/posts", postRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
