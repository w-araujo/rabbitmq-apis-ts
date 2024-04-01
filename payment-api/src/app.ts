import express, { Request, Response } from "express";
import { routes } from "../src/routes/index";
import { RabbitMQConsumer } from "../src/ms/RabbitMQConsumer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);

async function consumer() {
  const consumer = new RabbitMQConsumer(
    `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@rabbitmq`,
    "direct_exchange"
  );

  try {
    await consumer.connect();
  } catch (error) {
    console.error(error);
  }
}

setTimeout(consumer, 7000);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: "Hello World! Payment" });
});

console.log("url: " + process.env.DATABASE_URL_PAYMENT);

export default app;
