import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [ProductResolver, ProductService],
  exports: [ProductResolver, ProductService],
})
export class ProductModule {}
