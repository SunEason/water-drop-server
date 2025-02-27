import { Injectable } from '@nestjs/common';
import {
  Course,
  MutationCourseInput,
  PageCourseInput,
  ReducibleTime,
} from 'src/graphql.schema';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import pagegen from 'src/utils/pagegen';

type CourseInput = {
  reducibleTime?: object;
  createdBy: string;
  updatedBy?: string;
} & MutationCourseInput;

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(
    input: MutationCourseInput,
    createdBy: string,
    orgId: string,
  ) {
    const data = await this.prisma.course.create({
      data: <CourseInput>{
        ...input,
        createdBy,
        org: {
          connect: {
            id: orgId,
          },
        },
      },
    });
    if (!data) return null;
    return data as unknown as Course;
  }

  async updateCourse(
    id: string,
    input: MutationCourseInput,
    updatedBy: string,
  ) {
    const data = await this.prisma.course.update({
      where: {
        id,
      },
      data: <CourseInput>{
        ...input,
        updatedBy: updatedBy,
      },
    });
    if (!data) return null;
    return data as unknown as Course;
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
    const data = await this.prisma.course.findUnique({
      where: {
        id: id,
        deletedAt: null,
        createdBy: createdBy,
        org: {
          id: orgId,
        },
      },
    });

    if (!data) {
      return null;
    }

    return data as unknown as Course;
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
      return null;
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
