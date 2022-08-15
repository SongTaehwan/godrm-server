import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ShoppingCart, ShoppingCartModel } from './schema/shopping-cart.schema';
import { Food, FoodModel } from '../../food/src/schema/food.schema';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(Food.name)
    private foodModel: FoodModel,
    @InjectModel(ShoppingCart.name)
    private shoppingCartModel: ShoppingCartModel,
  ) {}

  async getCartByUser(id: string) {
    const cart = await this.shoppingCartModel.find({ user: id });

    if (!cart) {
      throw new NotFoundException();
    }

    return cart;
  }

  async getCartById(id: string) {
    const query = this.shoppingCartModel.findById(id);
    const cart = await query.exec();

    if (!cart) {
      throw new NotFoundException();
    }

    return cart;
  }

  async create(userId: string) {
    const cart = new this.shoppingCartModel({
      user: userId,
    });

    return cart.save();
  }

  async addItem(id: string) {
    const item = await this.foodModel.findById(id);
    if (!item) {
      throw new NotFoundException();
    }
    // TODO: update cart
  }

  async deleteItem(id: string) {
    // TODO: delete item from cart
  }

  async delete(id: string) {
    const cart = await this.shoppingCartModel.findByIdAndDelete(id);

    if (!cart) {
      throw new NotFoundException();
    }

    return cart;
  }
}
