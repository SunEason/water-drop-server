import { Injectable } from '@nestjs/common';
import { MutationOrganizationInput } from 'src/graphql.schema';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrganization(input: MutationOrganizationInput) {
    const data = await this.prisma.organization.create({
      data: input,
    });
    if (!data) {
      return null;
    }
    return data;
  }

  async updateOrganization(id: string, input: MutationOrganizationInput) {
    const data = await this.prisma.organization.update({
      where: {
        id: id,
      },
      data: input,
    });
    if (!data) {
      return null;
    }
    return data;
  }

  async removeOrganization(id: string) {
    const data = await this.prisma.organization.update({
      where: {
        id: id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    if (!data) {
      return null;
    }
    return true;
  }

  async getOrganization(id: string) {
    const data = await this.prisma.organization.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!data) {
      return null;
    }

    return data;
  }
}
