import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { CourseResolver } from './course.resolver';
import { CourseService } from './course.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [CourseResolver, CourseService],
  exports: [CourseResolver, CourseService],
})
export class CourseModule {}
