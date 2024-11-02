import { Module } from '@nestjs/common';
import { OSSService } from './oss.service';
import { OSSResolver } from './oss.resolver';

@Module({
  providers: [OSSService, OSSResolver],
})
export class OSSModule {}
