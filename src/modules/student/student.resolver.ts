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
    return this.studentService.pagingStudents(pageStudentInput);
  }
}
