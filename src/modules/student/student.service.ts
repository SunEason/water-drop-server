import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PageStudentInput } from 'src/graphql.schema';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async pagingStudents(pageParams: PageStudentInput) {
    const offset =
      (pageParams.pageInput.current - 1) * pageParams.pageInput.pageSize;
    const data = await this.prisma.student.findMany({
      skip: offset,
      take: pageParams.pageInput.pageSize,
      where: {
        name: {
          contains: pageParams.name,
        },
      },
    });
    if (!data) {
      return null;
    }
    const total = await this.prisma.student.count({
      where: {
        name: {
          contains: pageParams.name,
        },
      },
    });
    return {
      data,
      total,
    };
  }
}
