import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoId } from 'class-validator';

import {
  ShoppingCart,
  ShoppingCartModel,
  ShoppingCartDocument,
} from '../../../apps/shopping-cart/src/schema/shopping-cart.schema';

@Injectable()
export class GetShoppingCartById
  implements PipeTransform<string, Promise<ShoppingCartDocument>>
{
  constructor(
    @InjectModel(ShoppingCart.name)
    private shoppingCartModel: ShoppingCartModel,
  ) {}

  async transform(
    value: string,
    metadata: ArgumentMetadata,
  ): Promise<ShoppingCartDocument> {
    if (!isMongoId(value)) {
      throw new BadRequestException(`Invalid ID: ${value}`);
    }

    const cart = await this.shoppingCartModel.findOne({
      $or: [{ _id: value }, { user: value }],
    });

    if (!cart) {
      throw new NotFoundException();
    }

    return cart;
  }
}
