import { Injectable } from '@nestjs/common';
import { Card, CardInput } from 'src/graphql.schema';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async getCard(id: string) {
    const data = <Card>await this.prisma.card.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
    console.log(data);
    if (!data) {
      return null;
    }
    return data;
  }

  async getCards(courseId: string) {
    const data = (await this.prisma.card.findMany({
      where: {
        courseId,
        deletedAt: null,
      },
    })) as unknown as Card[];
    console.log(data);
    if (!data) {
      return null;
    }
    return data;
  }

  async createCard({
    input,
    createdBy,
    courseId,
    orgId,
  }: {
    input: CardInput;
    createdBy: string;
    courseId: string;
    orgId: string;
  }) {
    const data = <Card>await this.prisma.card.create({
      data: {
        ...input,
        createdBy,
        course: {
          connect: {
            id: courseId,
          },
        },
        org: {
          connect: {
            id: orgId,
          },
        },
      },
    });
    if (!data) return null;
    return data;
  }

  async updateCard({
    input,
    id,
    updatedBy,
  }: {
    id: string;
    input: CardInput;
    updatedBy: string;
  }) {
    const data = <Card>await this.prisma.card.update({
      where: {
        id,
      },
      data: {
        ...input,
        updatedBy: updatedBy,
      },
    });
    if (!data) return null;
    return data;
  }

  async removeCard(id: string) {
    const data = await this.prisma.card.update({
      where: {
        id: id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    if (!data) return false;
    return true;
  }
}
