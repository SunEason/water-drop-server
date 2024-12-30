import { Injectable } from '@nestjs/common';
import {
  MutationOrganizationInput,
  Organization,
  OrganizationResponse,
} from 'src/graphql.schema';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrganization(
    organization: MutationOrganizationInput,
  ): Promise<OrganizationResponse> {
    try {
      const data = this.prisma.organization.create({
        data: organization,
      });
      if (!data) {
        return {
          response: {
            success: false,
            message: 'Organization not created',
          },
        };
      }
      return {
        organization: data as unknown as Organization,
        response: {
          success: true,
          message: null,
        },
      };
    } catch (e) {
      return {
        response: {
          success: false,
          message: e.message,
        },
      };
    }
  }
}
