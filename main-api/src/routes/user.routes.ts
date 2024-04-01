import { Router, Request, Response } from "express";
import { User } from "@prisma/client";
import { UserService } from "../services/userService";

import {
  connectPrisma,
  disconnectPrisma,
} from "../prisma/utils/connectDisconnect";

const userRoute = Router();
const userService = new UserService();

userRoute.post("/create", async (req: Request, res: Response) => {
  try {
    await connectPrisma();

    const data: User = req.body;
    const user = await userService.create(data.name, data.email);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: (error as Error).message });
  } finally {
    await disconnectPrisma();
  }
});

userRoute.get("/listAll", async (req: Request, res: Response) => {
  try {
    await connectPrisma();

    const users = await userService.listAll();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: (error as Error).message });
  } finally {
    await disconnectPrisma();
  }
});

userRoute.get("/getById/:id", async (req: Request, res: Response) => {
  try {
    await connectPrisma();

    const user = await userService.getById(Number(req.params.id));
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: (error as Error).message });
  } finally {
    await disconnectPrisma();
  }
});

export { userRoute };
