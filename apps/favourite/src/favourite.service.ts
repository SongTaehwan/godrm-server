import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';

import {
  Favourite,
  FavouriteModel,
  FavouriteDocument,
} from './schema/favourite.schema';

import { RemoveFavouriteItemDto } from './dto/remove-favourite-item.dto';
import { AddFavouriteItemDto } from './dto/add-favourite-item.dto';

const ITEMS = 'items';
const CATEGORY = 'category';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectModel(Favourite.name)
    private favouriteModel: FavouriteModel,
  ) {}

  async getCart(query: FilterQuery<FavouriteDocument>) {
    const cart = await this.favouriteModel.findOne(query);

    if (!cart) {
      throw new NotFoundException();
    }

    return cart;
  }

  async getItems(id: string) {
    if (!(await this.favouriteModel.exists({ _id: id }))) {
      throw new NotFoundException();
    }

    const cart = await this.favouriteModel
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
    if (await this.favouriteModel.exists({ user: userId })) {
      throw new ConflictException();
    }

    const cart = new this.favouriteModel({
      user: userId,
    });

    return cart.save();
  }

  async delete(query: FilterQuery<FavouriteDocument>) {
    const cart = await this.favouriteModel.findOneAndDelete(query);

    if (!cart) {
      throw new ConflictException();
    }

    return {
      id: cart._id,
    };
  }

  async addItem({ id, itemId }: AddFavouriteItemDto) {
    if (
      await this.favouriteModel.exists({
        $and: [{ _id: id }, { items: { $in: [itemId] } }],
      })
    ) {
      throw new ConflictException();
    }

    // NOTE: _id 대신 id 를 사용하면 쿼리가 적용되지 않음
    const cart = await this.getCart({
      $and: [{ _id: id }, { items: { $nin: [itemId] } }],
    });

    cart.items.push(itemId);

    return cart.save();
  }

  async removeItem({ id, itemId }: RemoveFavouriteItemDto) {
    if (
      await this.favouriteModel.exists({
        $and: [{ _id: id }, { items: { $nin: [itemId] } }],
      })
    ) {
      throw new ConflictException();
    }

    const cart = await this.getCart({
      $and: [{ _id: id }, { items: { $in: [itemId] } }],
    });

    cart.items = cart.items.filter((_id) => _id === itemId);

    return cart.save();
  }
}
