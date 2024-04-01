import { Payment } from "@prisma/client";
import { prisma } from "../prisma/utils/client";

class PaymentService {
  async create(
    name: string,
    email: string,
    TotalValue: number
  ): Promise<Payment> {
    const payment = await prisma.payment.create({
      data: {
        name,
        email,
        TotalValue,
      },
    });

    return payment;
  }

  async listAll(): Promise<Payment[]> {
    const paymentList = await prisma.payment.findMany();
    return paymentList;
  }
}

export { PaymentService };
