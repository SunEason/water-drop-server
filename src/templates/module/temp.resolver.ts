import { Args, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/common/guards/auth.guard';
import { TempService } from './temp.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class TempResolver {
  constructor(private readonly tempService: TempService) {}

  @Query('temp')
  async users(@Args('input') input: unknown) {
    return this.tempService.greet(input);
  }
}
