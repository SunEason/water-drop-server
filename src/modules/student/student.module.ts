import { Module } from '@nestjs/common';
import { StudentResolver } from './student.resolver';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { StudentService } from './student.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [StudentResolver, StudentService],
  exports: [StudentResolver, StudentService],
})
export class StudentModule {}
