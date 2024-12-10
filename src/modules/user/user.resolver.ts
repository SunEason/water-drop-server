import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from 'src/graphql.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../common/guards/auth.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('users')
  async users(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Query('user')
  async user(@Args('id') id: string): Promise<User> {
    if (!id || !id.length) throw new Error('Id is required');
    return this.userService.findUserById(id);
  }

  @Query('getUserInfo')
  async getUserInfo(@Context() context: any): Promise<User> {
    const id = context.req.user.id;
    return this.userService.findUserById(id);
  }

  @Mutation('updateUserInfo')
  async updateUserInfo(
    @Args('id') id: string,
    @Args('input') user: UpdateUserDto,
  ): Promise<User> {
    const res = await this.userService.updateUser(id, user);
    if (!res) throw new Error('User not found');
    return res;
  }

  @Mutation('createUser')
  async createUser(@Args('input') user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Mutation('updateUser')
  async updateUser(
    @Args('id') id: string,
    @Args('input') user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Mutation('removeUser')
  async removeUser(@Args('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
