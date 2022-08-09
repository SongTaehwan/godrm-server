import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ShoppingCart, ShoppingCartModel } from './schema/shopping-cart.schema';
import { Food } from 'apps/food/src/schema/food.schema';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart.name)
    private shoppingCartModel: ShoppingCartModel,
    @InjectModel(Food.name)
    private foodModel: ShoppingCartModel,
  ) {}

  async getCartByUser(id: string): Promise<ShoppingCart> {
    const cart = await this.shoppingCartModel.findOne({ user: id });

    if (!cart) {
      throw new NotFoundException();
    }

    return cart;
  }

  async addItem(id: string) {
    const item = await this.foodModel.findById(id);

    if (!item) {
      throw new NotFoundException();
    }

    // TODO: update cart
  }

  async deleteItem(id: string) {
    // const item =
    // TODO: delete item from cart
  }
}
