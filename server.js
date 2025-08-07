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
  "http://localhost:3000", // desenvolvimento local
  "https://mynetblog.netlify.app" // produção no Netlify
];

// Configuração CORS para permitir cookies
app.use(cors({
  origin: function (origin, callback) {
    // Permite requisições sem origin (mobile/Safari) e com origins autorizadas
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// Middleware extra para garantir headers no mobile
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin || "*");
    res.header("Vary", "Origin");
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

// Inicia o servidor
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
