import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from 'src/graphql.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('users')
  async users(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Query('user')
  async user(id: string): Promise<User> {
    return this.userService.findUserById(id);
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
