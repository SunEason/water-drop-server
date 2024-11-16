import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('sendMessage')
  async sendMessage(@Args('tel') tel: string) {
    return this.authService.sendMessage(tel);
  }
}
