import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000", // sua url do front
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
