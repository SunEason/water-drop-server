import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserInput } from 'src/graphql.schema';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers() {
    try {
      const data = await this.prisma.user.findMany();
      return data.map((user) => {
        return {
          ...user,
          createTime: user.createTime.getTime().toString(),
          updateTime: user.updateTime.getTime().toString(),
        };
      });
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
      return {
        ...data,
        createTime: data.createTime.getTime().toString(),
        updateTime: data.updateTime.getTime().toString(),
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  async createUser(user: UserInput) {
    try {
      const data = await this.prisma.user.create({
        data: user,
      });
      return {
        ...data,
        createTime: data.createTime.getTime().toString(),
        updateTime: data.updateTime.getTime().toString(),
      };
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
      return {
        ...data,
        createTime: data.createTime.getTime().toString(),
        updateTime: data.updateTime.getTime().toString(),
      };
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
      return {
        ...data,
        createTime: data.createTime.getTime().toString(),
        updateTime: data.updateTime.getTime().toString(),
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
