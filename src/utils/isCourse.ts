import { Course } from 'src/graphql.schema';
import { Course as PrismaCourse } from '@prisma/client';

const isCourse = (data: PrismaCourse): data is Course & PrismaCourse => {
  if (!data?.reducibleTime) {
    return true;
  }
  if (
    Array.isArray(data.reducibleTime) &&
    data.reducibleTime.every(
      (item: unknown) => typeof item === 'object' && item,
    )
  ) {
    return true;
  }
};

export default isCourse;
