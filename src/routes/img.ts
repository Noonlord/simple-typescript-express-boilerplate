import axios from "axios";
import express, { RequestHandler } from "express";
import { getFileName, getImageUrl, writeToDb } from "../utilts";
import sharp from "sharp";
import path from "path";
const imgRouter = express.Router();

imgRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const fileName = await getFileName(Number(id));
  if (typeof fileName === "string") {
    res.sendFile(fileName);
  } else {
    const url = await getImageUrl(Number(id));
    console.log(url);
    const resp = await axios.get(url, { responseType: "arraybuffer" });
    await sharp(resp.data)
      .resize(400)
      .jpeg({ quality: 75 })
      .toFile("./img/" + id + ".jpg");
    const fPath = path.resolve(__dirname + "../../../img/" + id + ".jpg");
    writeToDb(Number(id), fPath);
    res.sendFile(fPath);
  }
});

export default imgRouter;
