import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helloRouter from "./routes/hello";
import imgRouter from "./routes/img";
var fs = require("fs");
var dir = "./img";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/hello", helloRouter);
app.use("/img", imgRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
