import * as amqp from "amqplib";
import { PaymentService } from "../services/paymentService";

class RabbitMQConsumer {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private exchangeName: string;

  constructor(
    private url: string,
    private exchange: string
  ) {
    this.exchangeName = exchange;
  }

  async connect(): Promise<void> {
    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(this.exchangeName, "direct", {
      durable: false,
    });

    // Crie uma fila exclusiva para este consumidor
    const queue = await this.channel.assertQueue("", { exclusive: true });

    // Vincule a fila à exchange com uma chave de roteamento específica
    await this.channel.bindQueue(queue.queue, this.exchangeName, "payments");

    console.log("[Payments] Esperando por mensagens...");

    // Assine a fila para receber mensagens
    this.channel.consume(queue.queue, (message) => {
      if (message) {
        console.log(`Mensagem recebida: ${message.content.toString()}`);
        const messageSplit = message.content.toString().split(" ");

        const paymentService = new PaymentService();
        paymentService.create(messageSplit[0], messageSplit[3], 100);

        this.channel.ack(message); // Confirma o recebimento da mensagem
      }
    });
  }

  async close(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
    console.log("Connection closed");
  }
}

export { RabbitMQConsumer };
