import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';

import {
  ShoppingCart,
  ShoppingCartModel,
  ShoppingCartDocument,
} from './schema/shopping-cart.schema';

import { RemoveShoppingCartItemDto } from './dto/remove-shopping-cart-item.dto';
import { AddShoppingCartItemDto } from './dto/add-shopping-cart-item.dto';

const ITEMS = 'items';
const CATEGORY = 'category';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart.name)
    private shoppingCartModel: ShoppingCartModel,
  ) {}

  async getCart(query: FilterQuery<ShoppingCartDocument>) {
    const cart = await this.shoppingCartModel.findOne(query);

    if (!cart) {
      throw new NotFoundException();
    }

    return cart;
  }

  async getItems(id: string) {
    const cart = await this.shoppingCartModel
      .findOne({ _id: id })
      .populate({
        path: ITEMS,
        populate: {
          path: CATEGORY,
        },
      })
      .exec();

    return cart.items;
  }

  async create(userId: string) {
    if (await this.shoppingCartModel.exists({ user: userId })) {
      throw new ConflictException();
    }

    const cart = new this.shoppingCartModel({
      user: userId,
    });

    return cart.save();
  }

  async delete(query: FilterQuery<ShoppingCartDocument>) {
    const cart = await this.shoppingCartModel.findOneAndDelete(query);

    if (!cart) {
      throw new ConflictException();
    }

    return {
      id: cart._id,
    };
  }

  async addItem({ id, itemId }: AddShoppingCartItemDto) {
    if (await this.shoppingCartModel.exists({ id })) {
      throw new ConflictException();
    }

    // NOTE: _id 대신 id 를 사용하면 쿼리가 적용되지 않음
    const cart = await this.getCart({
      $and: [{ _id: id }, { items: { $nin: [itemId] } }],
    });

    cart.items.push(itemId);

    return cart.save();
  }

  async removeItem({ id, itemId }: RemoveShoppingCartItemDto) {
    if (await this.shoppingCartModel.exists({ id })) {
      throw new ConflictException();
    }

    const cart = await this.getCart({
      $and: [{ _id: id }, { items: { $in: [itemId] } }],
    });

    cart.items = cart.items.filter((_id) => _id === itemId);

    return cart.save();
  }
}
