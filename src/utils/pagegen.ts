import { PageInput } from 'src/graphql.schema';

export default function pagegen(pageInput: PageInput) {
  return {
    skip: (pageInput.current - 1) * pageInput.pageSize,
    take: pageInput.pageSize,
  };
}
