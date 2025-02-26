import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { CardResolver } from './card.resolver';
import { CardService } from './card.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [CardResolver, CardService],
  exports: [CardResolver, CardService],
})
export class CardModule {}
