import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserInput } from 'src/graphql.schema';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers() {
    try {
      const data = await this.prisma.user.findMany();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findUserById(id: string) {
    try {
      const data = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async createUser(user: UserInput) {
    try {
      const data = await this.prisma.user.create({
        data: user,
      });
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateUser(id: string, user: UserInput) {
    try {
      const data = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: user,
      });
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteUser(id: string) {
    try {
      const data = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
}
