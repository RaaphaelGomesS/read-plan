import express from "express";
import cors from "cors";
import router from "./router/router.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message });
});

app.listen(3000, () => {
  console.log("aplicação rodando!");
});
