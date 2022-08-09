import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Food, FoodModel } from './schema/food.schema';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: FoodModel) {}

  async create() {
    return 'Food!';
  }

  async getAll(id: string) {
    const query = this.foodModel.find().where({ _id: id });
    const list = await query.exec();

    return list;
  }

  async update() {
    return 'Food!';
  }

  async delete(id: string) {
    const food = await this.foodModel.findByIdAndDelete(id);
    // TODO: favourite & cart 에서도 지우기

    if (!food) {
      throw new NotFoundException();
    }

    return {
      id: food._id,
    };
  }
}
