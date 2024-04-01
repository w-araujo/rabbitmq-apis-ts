import { User } from "@prisma/client";
import { prisma } from "../prisma/utils/client";

class UserService {
  async create(name: string, email: string): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return user;
  }

  async listAll(): Promise<User[]> {
    const userList = await prisma.user.findMany({
      include: { posts: true },
    });
    return userList;
  }

  async getById(id: number): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { id: id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

export { UserService };
