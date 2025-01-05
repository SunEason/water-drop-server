import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// import { UseGuards } from '@nestjs/common';
// import { GqlAuthGuard } from 'src/modules/common/guards/auth.guard';
import { OrganizationService } from './organization.service';
import { OrgImageService } from './org-image.service';
import {
  MutationOrganizationInput,
  Organization,
  PageOrganization,
  PageOrganizationInput,
} from 'src/graphql.schema';
// import { CurUserId } from '../common/decorators/current-user.decorator';

@Resolver()
// @UseGuards(GqlAuthGuard)
export class OrganizationResolver {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly orgImageService: OrgImageService,
  ) {}

  @Mutation('createOrganization')
  async users(
    @Args('input') input: MutationOrganizationInput,
    // @CurUserId() userId: string,
  ): Promise<Organization> {
    // console.log(userId);
    const data = await this.organizationService
      .createOrganization(input)
      .catch((err) => {
        throw new Error(err.message);
      });
    if (!data) throw new Error('Organization not created');
    return data;
  }

  @Mutation('updateOrganization')
  async updateOrganization(
    @Args('id') id: string,
    @Args('input') input: MutationOrganizationInput,
  ): Promise<Organization> {
    await this.orgImageService.deleteOrgImage(id).catch((err) => {
      throw new Error(err.message);
    });
    const data = await this.organizationService
      .updateOrganization(id, input)
      .catch((err) => {
        throw new Error(err.message);
      });
    if (!data) throw new Error('Organization not updated');
    return data;
  }

  @Mutation('removeOrganization')
  async removeOrganization(@Args('id') id: string): Promise<boolean> {
    const data = await this.organizationService
      .removeOrganization(id)
      .catch((err) => {
        throw new Error(err.message);
      });
    if (!data) throw new Error('Organization not removed');
    return true;
  }

  @Query('getOrganization')
  async getOrganization(@Args('id') id: string): Promise<Organization> {
    const data = await this.organizationService
      .getOrganization(id)
      .catch((err) => {
        throw new Error(err.message);
      });
    if (!data) throw new Error('Organization not found');
    return data;
  }

  @Query('pageOrganization')
  async organizations(
    @Args('input') input: PageOrganizationInput,
  ): Promise<PageOrganization> {
    const { data, total } =
      await this.organizationService.pageOrganization(input);
    if (!data) throw new Error('No organizations found');

    return {
      organizations: data,
      pageInfo: {
        total,
        current: input.pageInput.current,
        pageSize: input.pageInput.pageSize,
      },
    };
  }
}
