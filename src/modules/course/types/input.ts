import { Min } from 'class-validator';
import { MutationCourseInput } from 'src/graphql.schema';

export class IMutationCourseInput extends MutationCourseInput {
  @Min(0)
  limitNumber: number;
  @Min(0)
  duration: number;
}
