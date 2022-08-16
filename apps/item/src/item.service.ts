import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import {
  ShoppingCart,
  ShoppingCartModel,
} from '../../shopping-cart/src/schema/shopping-cart.schema';
import {
  Favourite,
  FavouriteModel,
} from '../../favourite/src/schema/favourite.schema';

import { Item, ItemModel } from './schema/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectConnection()
    private connection: Connection,
    @InjectModel(Item.name)
    private itemModel: ItemModel,
    @InjectModel(ShoppingCart.name)
    private shoppingCartModel: ShoppingCartModel,
    @InjectModel(Favourite.name)
    private favouriteModel: FavouriteModel,
  ) {}
  async get(id: string) {
    const query = this.itemModel.findById(id);
    const item = await query.exec();

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  async getByUser(id: string) {
    const query = this.itemModel.find({ user: id });
    const items = await query.exec();
    return items;
  }

  async create(createItemDto: CreateItemDto) {
    if (await this.itemModel.exists({ user: createItemDto.user })) {
      throw new ConflictException();
    }

    const item = new this.itemModel(createItemDto);
    return item.save();
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const query = this.itemModel.findByIdAndUpdate(id, updateItemDto, {
      new: true,
    });

    const update = await query.exec();

    if (!update) {
      throw new NotFoundException();
    }

    return update;
  }

  async delete(itemId: string) {
    const session = await this.connection.startSession();
    let result;

    await session.withTransaction(async () => {
      result = await this.itemModel.findByIdAndDelete(itemId);

      const query = { item: { $in: itemId } };

      await this.shoppingCartModel
        .updateMany(query, { $pull: { items: itemId } })
        .exec();
      await this.favouriteModel
        .updateMany(query, { $pull: { items: itemId } })
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
      result = await this.itemModel.deleteMany({ user: userId }).exec();
      await this.shoppingCartModel.findOneAndUpdate(
        { user: userId },
        { items: [] },
      );
      await this.favouriteModel.findOneAndUpdate(
        { user: userId },
        { items: [] },
      );
    });

    await session.endSession();

    return result;
  }
}
