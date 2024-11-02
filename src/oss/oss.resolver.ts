import { Query, Resolver } from '@nestjs/graphql';
import { OSSService } from './oss.service';
import { OSSParams } from 'src/graphql.schema';

@Resolver()
export class OSSResolver {
  constructor(private readonly ossService: OSSService) {}

  @Query('OSSInfo')
  async getOSSInfo(): Promise<OSSParams> {
    return this.ossService.getSignature();
  }
}
