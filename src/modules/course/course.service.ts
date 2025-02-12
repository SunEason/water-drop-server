import { Injectable } from '@nestjs/common';
import {
  Course,
  MutationCourseInput,
  PageCourseInput,
  ReducibleTime,
} from 'src/graphql.schema';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import pagegen from 'src/utils/pagegen';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(
    input: MutationCourseInput,
    createdBy: string,
    orgId: string,
  ) {
    const data = (await this.prisma.course.create({
      data: {
        ...input,
        createdBy,
        org: {
          connect: {
            id: orgId,
          },
        },
      } as {
        reducibleTime?: object;
        createdBy: string;
      } & MutationCourseInput,
    })) as unknown as Course;
    if (!data) return null;
    return data;
  }

  async updateCourse(
    id: string,
    input: MutationCourseInput,
    updatedBy: string,
  ) {
    const data = (await this.prisma.course.update({
      where: {
        id,
      },
      data: {
        ...input,
        updatedBy: updatedBy,
      } as {
        reducibleTime?: object;
        updatedBy: string;
      } & MutationCourseInput,
    })) as unknown as Course;
    if (!data) return null;
    return data;
  }

  async removeCourse(id: string) {
    const data = await this.prisma.course.update({
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

  async getCourse(id: string, createdBy: string, orgId: string) {
    const data = (await this.prisma.course.findUnique({
      where: {
        id: id,
        deletedAt: null,
        createdBy: createdBy,
        org: {
          id: orgId,
        },
      },
    })) as unknown as Course;

    if (!data) {
      return null;
    }

    return data;
  }

  async pageCourse(
    pageParams: PageCourseInput,
    createdBy: string,
    orgId: string,
  ) {
    const { pageInput, name } = pageParams;
    const total = await this.prisma.course.count({
      where: {
        deletedAt: null,
        name: {
          contains: name || '',
          mode: 'insensitive',
        },
        createdBy: createdBy,
        org: {
          id: orgId,
        },
      },
    });
    const data = (await this.prisma.course.findMany({
      ...pagegen(pageInput),
      where: {
        deletedAt: null,
        name: {
          contains: name,
          mode: 'insensitive',
        },
        createdBy: createdBy,
        org: {
          id: orgId,
        },
      },
    })) as unknown as Course[];
    if (!data) {
      throw new Error('Organization not found');
    }
    return {
      data,
      total,
    };
  }

  async setOrderTime(id: string, orderTime: ReducibleTime[]) {
    const data = (await this.prisma.course.update({
      where: {
        id,
      },
      data: {
        reducibleTime: orderTime as object,
      },
    })) as unknown as Course;
    if (!data) return null;
    return data.reducibleTime;
  }
}
