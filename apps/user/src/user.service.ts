import {
  Logger,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import {
  Favourite,
  FavouriteModel,
} from '../../favourite/src/schema/favourite.schema';

import {
  ShoppingCart,
  ShoppingCartModel,
} from '../../shopping-cart/src/schema/shopping-cart.schema';

import {
  Category,
  CategoryModel,
} from 'apps/category/src/schema/category.schema';

import { User, UserDocument, UserModel } from './schema/user.schema';
import { Food, FoodModel } from '../../food/src/schema/food.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectConnection()
    private connection: Connection,
    @InjectModel(User.name)
    private userModel: UserModel,
    @InjectModel(ShoppingCart.name)
    private shoppingCartModel: ShoppingCartModel,
    @InjectModel(Favourite.name)
    private favouriteModel: FavouriteModel,
    @InjectModel(Food.name)
    private foodModel: FoodModel,
    @InjectModel(Category.name)
    private categoryModel: CategoryModel,
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

  private checkUserExist(deviceId: string) {
    const query = this.userModel.exists({ device_uuid: deviceId });
    return query.exec();
  }

  async create(deviceId: string) {
    if (await this.checkUserExist(deviceId)) {
      throw new ConflictException();
    }

    const session = await this.connection.startSession();

    let result;

    await session.withTransaction(async () => {
      const user = new this.userModel({ device_uuid: deviceId });
      const cart = new this.shoppingCartModel({ user: user._id });
      const favourite = new this.favouriteModel({ user: user._id });

      result = await user.save();
      await cart.save();
      await favourite.save();
    });

    await session.endSession();

    return result;
  }

  async delete(id: string) {
    const session = await this.connection.startSession();

    let user;

    await session.withTransaction(async () => {
      user = await this.userModel.findByIdAndDelete(id);
      await this.favouriteModel.findOneAndDelete({ user: user._id });
      await this.shoppingCartModel.findOneAndDelete({ user: user._id });
      await this.foodModel.deleteMany({ user: user._id });
      await this.categoryModel.deleteMany({ user: user._id });
    });

    await session.endSession();

    if (!user) {
      throw new NotFoundException();
    }

    return {
      id: user._id,
    };
  }
}
