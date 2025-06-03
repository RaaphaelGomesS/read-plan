import express from "express";
import cors from "cors";
import UserRouter from "./router/UserRouter.js";
import BookRouter from "./router/BookRouter.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", UserRouter);
app.use("/book", BookRouter);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("aplicação rodando!");
});
