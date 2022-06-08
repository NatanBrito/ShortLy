import express from "express";
import cors from "cors";
import chalk from "chalk";
import authRouter from "./Routers/authRouter.js";
import urlsRouter from "./Routers/urlsRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(urlsRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.bold.green("Silencio, estamos no AR!!!"));
});