import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PageStudentInput, Students } from 'src/graphql.schema';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async pagingStudents(pageParams: PageStudentInput): Promise<Students> {
    try {
      const offset = pageParams.pageInput.page * pageParams.pageInput.limit;
      const res = await this.prisma.student.findMany({
        skip: offset,
        take: pageParams.pageInput.limit,
        where: {
          name: {
            contains: pageParams.name,
          },
        },
        // orderBy: {
        //   tel: 'asc',
        // },
      });
      console.log('students', res);
      if (!res) {
        return {
          error: 'No students found',
        };
      }
      const total = await this.prisma.student.count({
        where: {
          name: {
            contains: pageParams.name,
          },
        },
      });
      return {
        students: res,
        pageInfo: {
          total: total,
          page: pageParams.pageInput.page,
          limit: pageParams.pageInput.limit,
        },
        error: null,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
