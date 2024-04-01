import { Router, Request, Response } from "express";
import {
  connectPrisma,
  disconnectPrisma,
} from "../prisma/utils/connectDisconnect";
import { Post } from "@prisma/client";
import { PostService } from "../services/postService";

const postRoute = Router();
const postService = new PostService();

postRoute.post("/create/:authorId", async (req: Request, res: Response) => {
  try {
    await connectPrisma();

    const data: Post = req.body;
    const authorId = req.params.authorId;

    const user = await postService.create(
      data.title,
      data.content,
      Number(authorId)
    );
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: (error as Error).message });
  } finally {
    await disconnectPrisma();
  }
});

postRoute.get("/listAll", async (req: Request, res: Response) => {
  try {
    await connectPrisma();

    const posts = await postService.listAll();
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: (error as Error).message });
  } finally {
    await disconnectPrisma();
  }
});

export { postRoute };
