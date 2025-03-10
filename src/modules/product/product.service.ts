import { Injectable } from '@nestjs/common';
import { PageProductInput, Product, ProductInput } from 'src/graphql.schema';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import pagegen from 'src/utils/pagegen';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProduct(id: string) {
    const data = <Product>await this.prisma.product.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        cards: true,
        org: true,
      },
    });
    if (!data) return null;
    return data;
  }

  async pageProducts(pageParams: PageProductInput, curOrgId: string) {
    const { pageInput, name } = pageParams;
    const total = await this.prisma.product.count({
      where: {
        deletedAt: null,
        orgId: curOrgId,
        name: {
          contains: name || '',
          mode: 'insensitive',
        },
      },
    });
    const data = (await this.prisma.product.findMany({
      ...pagegen(pageInput),
      where: {
        deletedAt: null,
        name: {
          contains: name || '',
          mode: 'insensitive',
        },
      },
      include: {
        cards: true,
        org: true,
      },
    })) as unknown as Product[];

    if (!data) {
      return null;
    }
    return {
      data,
      total,
    };
  }

  async createProduct(product: ProductInput, createdBy: string, orgId: string) {
    const data = <Product>await this.prisma.product.create({
      data: {
        ...product,
        createdBy: createdBy,
        org: {
          connect: {
            id: orgId,
          },
        },
        cards: {
          connect:
            product.cards?.map((id) => ({
              id: id,
            })) || [],
        },
      },
      include: {
        cards: true,
        org: true,
      },
    });
    if (!data) {
      return null;
    }
    return data;
  }

  async updateProduct(
    id: string,
    product: ProductInput,
    updatedBy: string,
    orgId: string,
  ) {
    const data = <Product>await this.prisma.product.update({
      where: {
        id: id,
        deletedAt: null,
      },
      data: {
        ...product,
        updatedBy: updatedBy,
        org: {
          connect: {
            id: orgId,
          },
        },
        cards: {
          set:
            product.cards?.map((id) => ({
              id: id,
            })) || [],
        },
      },
      include: {
        cards: true,
        org: true,
      },
    });
    if (!data) {
      return null;
    }
    return data;
  }

  async removeProduct(id: string) {
    const data = await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    if (!data) {
      return null;
    }
    return data;
  }
}
