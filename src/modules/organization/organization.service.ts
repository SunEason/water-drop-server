import { Injectable } from '@nestjs/common';
import {
  MutationOrganizationInput,
  PageOrganizationInput,
} from 'src/graphql.schema';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import pagegen from 'src/utils/pagegen';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrganization(input: MutationOrganizationInput) {
    const { frontImages, roomImages, otherImages, ...rest } = input;
    const data = await this.prisma.organization.create({
      data: {
        ...rest,
        frontImages: {
          create: frontImages,
        },
        roomImages: {
          create: roomImages,
        },
        otherImages: {
          create: otherImages,
        },
      },
      include: {
        frontImages: true,
        roomImages: true,
        otherImages: true,
      },
    });
    if (!data) {
      return null;
    }
    return data;
  }

  async updateOrganization(id: string, input: MutationOrganizationInput) {
    const { frontImages, roomImages, otherImages, ...rest } = input;
    const data = await this.prisma.organization.update({
      where: {
        id: id,
      },
      data: {
        ...rest,
        frontImages: {
          create: frontImages,
        },
        roomImages: {
          create: roomImages,
        },
        otherImages: {
          create: otherImages,
        },
      },
      include: {
        frontImages: true,
        roomImages: true,
        otherImages: true,
      },
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
      include: {
        frontImages: true,
        roomImages: true,
        otherImages: true,
      },
    });

    if (!data) {
      return null;
    }

    return data;
  }

  async pageOrganization(pageParams: PageOrganizationInput) {
    const { pageInput, ...rest } = pageParams;
    const total = await this.prisma.organization.count({
      where: {
        deletedAt: null,
        name: pageParams.name,
      },
    });
    const data = await this.prisma.organization.findMany({
      ...pagegen(pageInput),
      where: {
        deletedAt: null,
        ...rest,
      },
    });
    if (!data) {
      throw new Error('Organization not found');
    }
    return {
      data,
      total,
    };
  }
}
