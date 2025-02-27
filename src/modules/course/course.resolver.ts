import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/common/guards/auth.guard';
import { CourseService } from './course.service';
import {
  Course,
  PageCourse,
  PageCourseInput,
  ReducibleTime,
  ReducibleTimeInput,
} from 'src/graphql.schema';
import { IMutationCourseInput } from './types/input';
import { CurOrgId } from '../common/decorators/current-org.decorator';
import { CurUserId } from '../common/decorators/current-user.decorator';

@Resolver()
@UseGuards(GqlAuthGuard)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query('getCourse')
  async getCourse(
    @Args('id') id: string,
    @CurUserId() curUserId: string,
    @CurOrgId() curOrgId: string,
  ): Promise<Course> {
    const data = await this.courseService.getCourse(id, curUserId, curOrgId);
    if (!data) throw new Error('Course not found');
    return data;
  }

  @Query('pageCourse')
  async pageCourse(
    @Args('input') input: PageCourseInput,
    @CurUserId() curUserId: string,
    @CurOrgId() curOrgId: string,
  ): Promise<PageCourse> {
    const { data, total } = await this.courseService.pageCourse(
      input,
      curUserId,
      curOrgId,
    );
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
    @CurUserId() curUserId: string,
    @CurOrgId() curOrgId: string,
  ): Promise<Course> {
    const data = await this.courseService.createCourse(
      input,
      curUserId,
      curOrgId,
    );
    if (!data) throw new Error('Course not created');
    return data;
  }

  @Mutation('updateCourse')
  async updateCourse(
    @Args('id') id: string,
    @Args('input') input: IMutationCourseInput,
    @CurUserId() curUserId: string,
  ): Promise<Course> {
    const data = await this.courseService.updateCourse(id, input, curUserId);
    if (!data) throw new Error('Course not updated');
    return data;
  }

  @Mutation('commitCourse')
  async commitCourse(
    @Args('input') input: IMutationCourseInput,
    @Args('id') id: string,
    @CurUserId() curUserId: string,
    @CurOrgId() curOrgId: string,
  ): Promise<Course> {
    if (id) {
      const data = await this.courseService.updateCourse(id, input, curUserId);
      if (!data) throw new Error('Course not updated');
      return data;
    } else {
      const data = await this.courseService.createCourse(
        input,
        curUserId,
        curOrgId,
      );
      if (!data) throw new Error('Course not created');
      return data;
    }
  }

  @Mutation('removeCourse')
  async removeCourse(@Args('id') id: string): Promise<boolean> {
    const data = await this.courseService.removeCourse(id);
    if (!data) throw new Error('Course not removed');
    return true;
  }

  @Query('getOrderTime')
  async getOrderTime(
    @Args('id') id: string,
    @CurUserId() curUserId: string,
    @CurOrgId() curOrgId: string,
  ): Promise<ReducibleTime[]> {
    const data = await this.courseService.getCourse(id, curUserId, curOrgId);
    if (!data) throw new Error('Course not found');
    return data.reducibleTime;
  }

  @Mutation('setOrderTime')
  async setOrderTime(
    @Args('id') id: string,
    @Args('input') input: ReducibleTimeInput[] | undefined | null,
  ): Promise<ReducibleTime[]> {
    const data = await this.courseService.setOrderTime(id, input);
    if (!data) throw new Error('OrderTime not updated');
    return data;
  }
}
