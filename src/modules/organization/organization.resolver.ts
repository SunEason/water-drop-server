import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// import { UseGuards } from '@nestjs/common';
// import { GqlAuthGuard } from 'src/modules/common/guards/auth.guard';
import { OrganizationService } from './organization.service';
import { OrgImageService } from './org-image.service';
import {
  MutationOrganizationInput,
  OrganizationResponse,
  Response,
} from 'src/graphql.schema';
import Res from 'src/utils/response';
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
  ): Promise<OrganizationResponse> {
    // console.log(userId);
    const data = await this.organizationService.createOrganization(input);
    if (!data) return new Res(false, 'create organization failed');
    return {
      organization: data,
      ...new Res(true),
    };
  }

  @Mutation('updateOrganization')
  async updateOrganization(
    @Args('id') id: string,
    @Args('input') input: MutationOrganizationInput,
  ): Promise<OrganizationResponse> {
    await this.orgImageService.deleteOrgImage(id);
    const data = await this.organizationService.updateOrganization(id, input);
    if (!data) return new Res(false, 'not fond organization');
    return {
      organization: data,
      ...new Res(true),
    };
  }

  @Mutation('removeOrganization')
  async removeOrganization(@Args('id') id: string): Promise<Response> {
    const data = await this.organizationService.removeOrganization(id);
    if (!data) return new Res(false, 'not fond organization').response;
    return new Res(true).response;
  }

  @Query('getOrganization')
  async getOrganization(@Args('id') id: string): Promise<OrganizationResponse> {
    const data = await this.organizationService.getOrganization(id);
    if (!data) return new Res(false, 'not fond organization');
    return {
      organization: data,
      ...new Res(true),
    };
  }
}
