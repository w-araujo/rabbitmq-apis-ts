import { Router, Request, Response } from "express";
import {
  connectPrisma,
  disconnectPrisma,
} from "../prisma/utils/connectDisconnect";
import { Payment } from "@prisma/client";
import { PaymentService } from "../services/paymentService";

const paymentRoute = Router();
const paymentService = new PaymentService();

paymentRoute.post("/create", async (req: Request, res: Response) => {
  try {
    await connectPrisma();

    const data: Payment = req.body;
    const payment = await paymentService.create(
      data.name,
      data.email,
      Number(data.TotalValue)
    );
    return res.status(201).json(payment);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: (error as Error).message });
  } finally {
    await disconnectPrisma();
  }
});

paymentRoute.get("/listAll", async (req: Request, res: Response) => {
  try {
    await connectPrisma();

    const payments = await paymentService.listAll();
    return res.status(200).json(payments);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: (error as Error).message });
  } finally {
    await disconnectPrisma();
  }
});

export { paymentRoute };
