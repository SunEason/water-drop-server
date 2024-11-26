import { Query, Resolver } from '@nestjs/graphql';
import { OSSService } from './oss.service';
import { OSSParams } from 'src/graphql.schema';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../common/guards/auth.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class OSSResolver {
  constructor(private readonly ossService: OSSService) {}

  @Query('OSSInfo')
  async getOSSInfo(): Promise<OSSParams> {
    // console.log('getOSSInfo');
    return this.ossService.getSignature();
  }
}
