import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('sendMessage')
  async sendMessage(@Args('tel') tel: string) {
    return this.authService.sendMessage(tel);
  }

  @Mutation('login')
  async login(@Args('tel') tel: string, @Args('code') code: string) {
    return this.authService.login(tel, code);
  }
}
