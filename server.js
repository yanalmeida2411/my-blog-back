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
  "http://localhost:3000",           // desenvolvimento local
  "https://mynetblog.netlify.app"    // produção no Netlify
];

// CORS configurado para aceitar cookies e mobile
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // permite chamadas sem Origin (mobile/Safari)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

// Garantir que o navegador aceite cookies no cross-domain
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Middlewares padrão
app.use(cookieParser());
app.use(express.json());

// Rotas
app.use("/follows", followRoutes);
app.use("/", userRoutes);
app.use("/posts", postRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});