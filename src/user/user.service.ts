import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserInput } from 'src/graphql.schema';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers() {
    try {
      return this.prisma.user.findMany();
    } catch (err) {
      // Handle error
      throw new Error(err);
    }
  }

  async findUserById(id: string) {
    try {
      return this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async createUser(user: UserInput) {
    try {
      return this.prisma.user.create({
        data: user,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateUser(id: string, user: UserInput) {
    try {
      return this.prisma.user.update({
        where: {
          id: id,
        },
        data: user,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteUser(id: string) {
    try {
      return this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
