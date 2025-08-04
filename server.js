import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;

const allowedOrigins = [
  "http://localhost:3000",           // para testar local
  "https://mynetblog.netlify.app"   // produção (Netlify)
];

app.use(
  cors({
    origin: allowedOrigins, // sua url do front
    credentials: true, // habilita cookies
  })
);

// E também o parser de cookies:
app.use(cookieParser());
app.use(express.json());


app.use("/follows", followRoutes);

app.use("/", userRoutes);
app.use("/posts", postRoutes)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
