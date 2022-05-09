import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helloRouter from "./routes/hello";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/hello", helloRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
