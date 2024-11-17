import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query('sendMessage')
  async sendMessage(@Args('tel') tel: string) {
    return this.authService.sendMessage(tel);
  }
}
