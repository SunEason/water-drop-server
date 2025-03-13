import { Injectable } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { PageProductInput, Product, ProductInput } from 'src/graphql.schema';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import pagegen from 'src/utils/pagegen';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProduct(id: string) {
    const data = await this.prisma.product.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        cards: {
          include: {
            course: true,
          },
        },
        org: true,
      },
    });
    if (!data) return null;
    return data as unknown as Product;
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
    product: Partial<ProductInput>,
    updatedBy: string,
  ) {
    const data = await this.prisma.product.update({
      where: {
        id: id,
        deletedAt: null,
      },
      data: {
        ...product,
        updatedBy: updatedBy,
        // org: {
        //   connect: {
        //     id: orgId,
        //   },
        // },
        cards: {
          set:
            product.cards?.map((id) => ({
              id: id,
            })) || [],
        },
      },
      include: {
        cards: {
          include: {
            course: true,
          },
        },
        org: true,
      },
    });
    if (!data) {
      return null;
    }
    return data as unknown as Product;
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

  changeStatus(id: string, status: ProductStatus) {
    const data = this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    if (!data) return null;
    return data as unknown as Product;
  }
}
