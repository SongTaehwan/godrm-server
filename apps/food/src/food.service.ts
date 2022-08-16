import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'mongoose';

import {
  ShoppingCart,
  ShoppingCartModel,
} from '../../shopping-cart/src/schema/shopping-cart.schema';
import {
  Favourite,
  FavouriteModel,
} from '../../favourite/src/schema/favourite.schema';

import { Food, FoodModel } from './schema/food.schema';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectConnection()
    private connection: Connection,
    @InjectModel(Food.name)
    private foodModel: FoodModel,
    @InjectModel(ShoppingCart.name)
    private shoppingCartModel: ShoppingCartModel,
    @InjectModel(Favourite.name)
    private favouriteModel: FavouriteModel,
  ) {}
  async get(id: string) {
    const query = this.foodModel.findById(id);
    const category = await query.exec();

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async getByUser(id: string) {
    const query = this.foodModel.find({ user: id });
    const categories = await query.exec();
    return categories;
  }

  create(createCategoryDto: CreateFoodDto) {
    const category = new this.foodModel(createCategoryDto);
    return category.save();
  }

  async update(id: string, updateCategoryDto: UpdateFoodDto) {
    const query = this.foodModel.findByIdAndUpdate(id, updateCategoryDto, {
      new: true,
    });

    const update = await query.exec();

    if (!update) {
      throw new NotFoundException();
    }

    return update;
  }

  async delete(foodId: string) {
    const session = await this.connection.startSession();
    let result;

    await session.withTransaction(async () => {
      result = await this.foodModel.findByIdAndDelete(foodId);

      const query = { food: { $in: foodId } };

      await this.shoppingCartModel
        .updateMany(query, { $pull: { food: foodId } })
        .exec();
      await this.favouriteModel
        .updateMany(query, { $pull: { food: foodId } })
        .exec();
    });

    await session.endSession();

    if (!result) {
      throw new NotFoundException();
    }

    return {
      id: result._id,
    };
  }

  async deleteByUser(userId: string) {
    const session = await this.connection.startSession();
    let result;

    await session.withTransaction(async () => {
      result = await this.foodModel.deleteMany({ user: userId }).exec();
      await this.shoppingCartModel.findOneAndUpdate(
        { user: userId },
        { food: [] },
      );
      await this.favouriteModel.findOneAndUpdate(
        { user: userId },
        { food: [] },
      );
    });

    await session.endSession();

    return result;
  }
}
