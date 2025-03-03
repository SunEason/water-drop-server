export default function genResolver(name) {
  const Name = name.charAt(0).toUpperCase() + name.slice(1);
  return `import { Args, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/common/guards/auth.guard';
import { ${Name}Service } from './${name}.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class ${Name}Resolver {
  constructor(private readonly ${name}Service: ${Name}Service) {}

  @Query('${name}')
  async ${name}(@Args('input') input: unknown) {
    return this.${name}Service.${name}(input);
  }
}
`;
}
