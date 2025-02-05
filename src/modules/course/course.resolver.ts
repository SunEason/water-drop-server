import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/common/guards/auth.guard';
import { CourseService } from './course.service';
import { Course, PageCourse, PageCourseInput } from 'src/graphql.schema';
import { IMutationCourseInput } from './types/input';

@Resolver()
@UseGuards(GqlAuthGuard)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query('getCourse')
  async getCourse(@Args('id') id: string): Promise<Course> {
    const data = await this.courseService.getCourse(id).catch((e) => {
      throw new Error(e.message);
    });
    if (!data) throw new Error('Course not found');
    return data;
  }

  @Query('pageCourse')
  async pageCourse(@Args('input') input: PageCourseInput): Promise<PageCourse> {
    const { data, total } = await this.courseService
      .pageCourse(input)
      .catch((e) => {
        throw new Error(e.message);
      });
    if (!data) throw new Error('No courses found');
    return {
      courses: data,
      pageInfo: {
        total,
        current: input.pageInput.current,
        pageSize: input.pageInput.pageSize,
      },
    };
  }

  @Mutation('createCourse')
  async createCourse(
    @Args('input') input: IMutationCourseInput,
  ): Promise<Course> {
    const data = await this.courseService.createCourse(input).catch((e) => {
      throw new Error(e.message);
    });
    if (!data) throw new Error('Course not created');
    return data;
  }

  @Mutation('updateCourse')
  async updateCourse(
    @Args('id') id: string,
    @Args('input') input: IMutationCourseInput,
  ): Promise<Course> {
    const data = await this.courseService.updateCourse(id, input).catch((e) => {
      throw new Error(e.message);
    });
    if (!data) throw new Error('Course not updated');
    return data;
  }

  @Mutation('commitCourse')
  async commitCourse(
    @Args('input') input: IMutationCourseInput,
    @Args('id') id: string,
  ): Promise<Course> {
    if (id) {
      const data = await this.courseService
        .updateCourse(id, input)
        .catch((e) => {
          throw new Error(e.message);
        });
      if (!data) throw new Error('Course not updated');
      return data;
    } else {
      const data = await this.courseService.createCourse(input).catch((e) => {
        throw new Error(e.message);
      });
      if (!data) throw new Error('Course not created');
      return data;
    }
  }

  @Mutation('removeCourse')
  async removeCourse(@Args('id') id: string): Promise<boolean> {
    const data = await this.courseService.removeCourse(id).catch((e) => {
      throw new Error(e.message);
    });
    if (!data) throw new Error('Course not removed');
    return true;
  }
}
