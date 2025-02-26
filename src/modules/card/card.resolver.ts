import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/common/guards/auth.guard';
import { CardService } from './card.service';
import { Card, CardInput, Method } from 'src/graphql.schema';
import { CurUserId } from '../common/decorators/current-user.decorator';
import { CurOrgId } from '../common/decorators/current-org.decorator';

@Resolver()
@UseGuards(GqlAuthGuard)
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  @Query('card')
  async users(@Args('id') id: string): Promise<Card> {
    const data = await this.cardService.getCard(id);
    if (!data) throw new Error('Card not found');
    return data;
  }

  @Query('cards')
  async cards(@Args('courseId') id: string): Promise<Card[]> {
    const data = await this.cardService.getCards(id);
    if (!data) throw new Error('Card not found');
    return data;
  }

  @Mutation('createCard')
  async createCard(
    @Args('input') input: CardInput,
    @Args('courseId') courseId: string,
    @CurUserId() createdBy: string,
    @CurOrgId() orgId: string,
  ): Promise<Card> {
    const data = await this.cardService.createCard({
      input,
      createdBy,
      courseId,
      orgId,
    });
    if (!data) throw new Error('Create Card failed');
    return data;
  }

  @Mutation('updateCard')
  async updateCard(
    @Args('id') id: string,
    @Args('input') input: CardInput,
    @CurUserId() updatedBy: string,
  ): Promise<Card> {
    const data = await this.cardService.updateCard({
      id,
      input,
      updatedBy,
    });
    if (!data) throw new Error('Update Card failed');
    return data;
  }

  @Mutation('commitCard')
  async commitCard(
    @Args('id') id: string,
    @Args('input') input: CardInput,
    @Args('method') method: Method,
    @CurUserId() userId: string,
    @CurOrgId() orgId: string,
  ): Promise<Card> {
    if (method === Method.update) {
      const data = await this.cardService.updateCard({
        input,
        id,
        updatedBy: userId,
      });
      if (!data) throw new Error('Commit Card failed');
      return data;
    }
    const data = await this.cardService.createCard({
      input,
      createdBy: userId,
      courseId: id,
      orgId,
    });
    if (!data) throw new Error('Commit Card failed');
    return data;
  }

  @Mutation('removeCard')
  async deleteCard(@Args('id') id: string): Promise<boolean> {
    const data = await this.cardService.removeCard(id);
    if (!data) throw new Error('Remove Card failed');
    return true;
  }
}
