import { Injectable } from '@nestjs/common';
import {
  MutationOrganizationInput,
  Organization,
  OrganizationResponse,
  Response,
} from 'src/graphql.schema';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import Res from 'src/utils/response';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrganization(
    input: MutationOrganizationInput,
  ): Promise<OrganizationResponse> {
    try {
      const data = this.prisma.organization.create({
        data: input,
      });
      if (!data) {
        return new Res(false, 'Organization not created');
      }
      return {
        organization: data as unknown as Organization,
        ...new Res(true),
      };
    } catch (e) {
      return new Res(false, e.message);
    }
  }

  async updateOrganization(
    id: string,
    input: MutationOrganizationInput,
  ): Promise<OrganizationResponse> {
    try {
      const data = this.prisma.organization.update({
        where: {
          id: id,
        },
        data: input,
      });
      if (!data) {
        return new Res(false, 'Organization not found');
      }
      return {
        organization: data as unknown as Organization,
        ...new Res(true),
      };
    } catch (e) {
      return new Res(false, e.message);
    }
  }

  async removeOrganization(id: string): Promise<Response> {
    try {
      const data = this.prisma.organization.delete({
        where: {
          id: id,
        },
      });
      if (!data) {
        return new Res(false, 'Organization not found').response;
      }
      return new Res(true).response;
    } catch (e) {
      return new Res(false, e.message).response;
    }
  }

  async getOrganization(id: string): Promise<OrganizationResponse> {
    try {
      const data = this.prisma.organization.findUnique({
        where: {
          id: id,
        },
      });

      if (!data) {
        return new Res(false, 'Organization not found');
      }

      return {
        organization: data as unknown as Organization,
        ...new Res(true),
      };
    } catch (e) {
      return new Res(false, e.message);
    }
  }
}
