import { Module } from '@nestjs/common';
import { DateTimeScalar } from './scalars/DateTime.scalar';

@Module({
  providers: [DateTimeScalar],
})
export class CommonModule {}
