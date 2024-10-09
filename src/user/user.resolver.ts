import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './DTO/create-user.dto';

@Resolver()
export class UserResolver {
  @Inject(PrismaService)
  private prisma: PrismaService;

  @Query('users')
  async users() {
    return this.prisma.user.findMany();
  }

  @Query('user')
  async user(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  @Mutation('createUser')
  async createUser(@Args('user') User: CreateUserDto) {
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
}
