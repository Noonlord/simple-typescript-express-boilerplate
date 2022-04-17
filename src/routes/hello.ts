import express, { RequestHandler } from "express";
const helloRouter = express.Router();

const helloMiddleware: RequestHandler = async (req, res, next) => {
  // Add your conditionals here
  next();
};

helloRouter.get("/world", helloMiddleware, (req, res) => {
  console.log("sa");
  res.send("Hello World!");
});

export default helloRouter;
