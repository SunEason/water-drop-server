import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [OrganizationResolver, OrganizationService],
  exports: [OrganizationResolver, OrganizationService],
})
export class OrganizationModule {}
