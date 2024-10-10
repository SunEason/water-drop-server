import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from '../graphql';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query('users')
  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  @Query('user')
  async user(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation('createUser')
  async createUser(@Args('user') User: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: User,
      select: {
        id: true,
        name: true,
        password: true,
        account: true,
        desc: true,
        tel: true,
        createTime: true,
        updateTime: true,
      },
    });
  }

  @Mutation('updateUser')
  async updateUser(@Args('user') user: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }
}
