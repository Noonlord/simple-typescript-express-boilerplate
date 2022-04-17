import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import helloRouter from "./routes/hello";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use("/hello", helloRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
