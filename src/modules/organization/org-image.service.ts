import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class OrgImageService {
  constructor(private prismaService: PrismaService) {}

  async deleteOrgImage(orgId: string) {
    const images = await this.prismaService.orgImage.findMany({
      where: {
        OR: [
          {
            frontOrgId: orgId,
          },
          {
            frontOrgId: orgId,
          },
          {
            roomOrgId: orgId,
          },
        ],
      },
    });
    if (images.length === 0) {
      return;
    }
    const result = await this.prismaService.orgImage.deleteMany({
      where: {
        id: {
          in: images.map((image) => image.id),
        },
      },
    });

    if (result.count > 0) {
      return true;
    }
    return false;
  }
}
