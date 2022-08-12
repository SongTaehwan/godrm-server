import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  Favourite,
  FavouriteModel,
} from 'apps/favourite/src/schema/favourite.schema';

import {
  ShoppingCart,
  ShoppingCartModel,
} from 'apps/shopping-cart/src/schema/shopping-cart.schema';

import { User, UserDocument, UserModel } from './schema/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name)
    private userModel: UserModel,
    @InjectModel(ShoppingCart.name)
    private shoppingCartModel: ShoppingCartModel,
    @InjectModel(Favourite.name)
    private favouriteModel: FavouriteModel,
  ) {}

  async getAll(): Promise<User[]> {
    const query = this.userModel.find();
    const users = await query.exec();

    return users;
  }

  async getById(id: string): Promise<UserDocument> {
    const query = this.userModel.findById(id);
    const user = await query.exec();

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getByDeviceId(id: string) {
    const query = this.userModel.findOne({ device_uuid: id });
    const user = await query.exec();

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(deviceId: string) {
    let userId = '';

    try {
      const user = await this.createUser(deviceId);
      userId = user.id;
      await this.createCart(user.id);
      await this.createFavourite(user.id);
      return user;
    } catch (error) {
      if (userId) {
        await this.delete(userId);
      }
    }
  }

  private async createUser(id: string) {
    const user = new this.userModel({ device_uuid: id });
    const result = await user.save();

    return result;
  }

  private async createCart(userId: string) {
    const cart = new this.shoppingCartModel({ user: userId });
    const result = await cart.save();

    return result;
  }

  private async createFavourite(userId: string) {
    const favourite = new this.favouriteModel({ user: userId });
    const result = await favourite.save();

    return result;
  }

  async delete(id: string) {
    const result = await this.deleteUser(id);
    await this.deleteCart(id);
    await this.deleteFavourite(id);

    return result;
  }

  private async deleteUser(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);

    return {
      id: user._id,
    };
  }

  private async deleteFavourite(id: string) {
    const favourite = await this.favouriteModel.findOneAndDelete({ user: id });

    return {
      id: favourite._id,
    };
  }

  private async deleteCart(id: string) {
    const cart = await this.shoppingCartModel.findOneAndDelete({ user: id });

    return {
      id: cart._id,
    };
  }
}
