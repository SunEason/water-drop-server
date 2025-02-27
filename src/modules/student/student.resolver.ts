import { Args, Query, Resolver } from '@nestjs/graphql';

import { PageStudentInput, Students } from 'src/graphql.schema';
import { StudentService } from './student.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../common/guards/auth.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query('students')
  async users(
    @Args('input') pageStudentInput: PageStudentInput,
  ): Promise<Students> {
    const { data, total } =
      await this.studentService.pagingStudents(pageStudentInput);
    if (!data) {
      throw new Error('Data not found');
    }
    return {
      students: data,
      pageInfo: {
        current: pageStudentInput.pageInput.current,
        pageSize: pageStudentInput.pageInput.pageSize,
        total: total,
      },
    };
  }
}
