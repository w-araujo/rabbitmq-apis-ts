import express, { Request, Response } from "express";
import { routes } from "./routes/index";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: "Hello World! Main" });
});

console.log("url: " + process.env.DATABASE_URL_MAIN);

export default app;
