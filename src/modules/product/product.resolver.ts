import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/common/guards/auth.guard';
import { ProductService } from './product.service';
import {
  PageProduct,
  PageProductInput,
  Product,
  ProductStatus,
  ProductType,
} from 'src/graphql.schema';
import { CurUserId } from '../common/decorators/current-user.decorator';
import { CurOrgId } from '../common/decorators/current-org.decorator';
import { IProductInput } from './types/input';
import { PRODUCT_TYPES } from 'src/const/productTypes';

@Resolver()
@UseGuards(GqlAuthGuard)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query('product')
  async product(@Args('id') id: string): Promise<Product> {
    const data = await this.productService.getProduct(id);
    if (!data) throw new Error('Product not found');
    return data;
  }

  @Query('pageProduct')
  async pageProduct(
    @Args('input') input: PageProductInput,
    @CurUserId() curUserId: string,
    @CurOrgId() curOrgId: string,
  ): Promise<PageProduct> {
    const { data, total } = await this.productService.pageProducts(
      input,
      curOrgId,
    );
    if (!data) throw new Error('No products found');
    return {
      products: data,
      pageInfo: {
        total,
        current: input.pageInput.current,
        pageSize: input.pageInput.pageSize,
      },
    };
  }

  @Query('productTypes')
  async productTypes(): Promise<ProductType[]> {
    return PRODUCT_TYPES;
  }

  @Mutation('createProduct')
  async createProduct(
    @Args('input') input: IProductInput,
    @CurUserId() curUserId: string,
    @CurOrgId() curOrgId: string,
  ): Promise<Product> {
    const data = await this.productService.createProduct(
      input,
      curUserId,
      curOrgId,
    );
    if (!data) throw new Error('Product not created');
    return data;
  }

  @Mutation('updateProduct')
  async updateProduct(
    @Args('input') input: IProductInput,
    @Args('id') id: string,
    @CurUserId() curUserId: string,
    @CurOrgId() curOrgId: string,
  ): Promise<Product> {
    const data = await this.productService.updateProduct(
      id,
      input,
      curUserId,
      curOrgId,
    );
    if (!data) throw new Error('Product not updated');
    return data;
  }

  @Mutation('commitProduct')
  async commitProduct(
    @Args('input') input: IProductInput,
    @Args('id') id: string,
    @CurUserId() curUserId: string,
    @CurOrgId() curOrgId: string,
  ): Promise<Product> {
    if (id) {
      return this.updateProduct(input, id, curUserId, curOrgId);
    }
    return this.createProduct(input, curUserId, curOrgId);
  }

  @Mutation('removeProduct')
  async removeProduct(@Args('id') id: string): Promise<boolean> {
    const data = await this.productService.removeProduct(id);
    if (!data) throw new Error('Product not removed');
    return true;
  }

  @Mutation('changeStatus')
  async changeStatus(
    @Args('id') id: string,
    @Args('status') status: ProductStatus,
  ): Promise<boolean> {
    const data = await this.productService.changeStatus(id, status);
    if (!data) throw new Error('Product status not changed');
    return true;
  }
}
