import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';
import { OrgImageService } from './org-image.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [OrganizationResolver, OrganizationService, OrgImageService],
  exports: [OrganizationResolver, OrganizationService, OrgImageService],
})
export class OrganizationModule {}
