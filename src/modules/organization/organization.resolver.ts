import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/common/guards/auth.guard';
import { OrganizationService } from './organization.service';
import { MutationOrganizationInput } from 'src/graphql.schema';

@Resolver()
@UseGuards(GqlAuthGuard)
export class OrganizationResolver {
  constructor(private readonly OrganizationService: OrganizationService) {}

  @Mutation('createOrganization')
  async users(@Args('input') input: MutationOrganizationInput) {
    return this.OrganizationService.createOrganization(input);
  }
}
