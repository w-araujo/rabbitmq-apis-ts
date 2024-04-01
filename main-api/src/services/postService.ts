import { Post } from "@prisma/client";
import { prisma } from "../prisma/utils/client";
import { RabbitMQProducer } from "../ms/RabbitMqProducer";
import { UserService } from "../services/userService";

import dotenv from "dotenv";
dotenv.config();

class PostService {
  async create(
    title: string,
    content: string,
    authorId: number
  ): Promise<Post> {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    if (post) {
      const producer = new RabbitMQProducer(
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@rabbitmq`,
        "direct_exchange"
      );

      try {
        await producer.connect();

        const userService = new UserService();

        const user = await userService.getById(authorId);

        await producer.sendMessage(
          "payments",
          `${user.name} com e-mail ${user.email}, criou um novo post, com o titulo "${title}"`
        );
      } catch (error) {
        console.error(error);
      } finally {
        await producer.close();
      }

      return post;
    }
  }

  async listAll(): Promise<Post[]> {
    const postList = await prisma.post.findMany();
    return postList;
  }
}

export { PostService };
