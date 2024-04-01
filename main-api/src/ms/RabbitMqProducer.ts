import * as amqp from "amqplib";

class RabbitMQProducer {
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
  }

  async sendMessage(routingKey: string, message: string): Promise<void> {
    if (!this.channel) {
      throw new Error("Producer not connected. Call connect() first.");
    }

    this.channel.publish(this.exchangeName, routingKey, Buffer.from(message));
    console.log(`Sent message "${message}" with routing key "${routingKey}"`);
  }

  async close(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
    console.log("Connection closed");
  }
}

export { RabbitMQProducer };
