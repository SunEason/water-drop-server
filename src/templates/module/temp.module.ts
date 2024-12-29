import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { TempResolver } from './temp.resolver';
import { TempService } from './temp.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [TempResolver, TempService],
  exports: [TempResolver, TempService],
})
export class TempModule {}
