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
  Food,
  FoodModel,
  FoodDocument,
} from '../../../apps/food/src/schema/food.schema';

@Injectable()
export class GetFoodById
  implements PipeTransform<string, Promise<FoodDocument>>
{
  constructor(
    @InjectModel(Food.name)
    private foodModel: FoodModel,
  ) {}

  async transform(
    value: string,
    metadata: ArgumentMetadata,
  ): Promise<FoodDocument> {
    if (!isMongoId(value)) {
      throw new BadRequestException(`Invalid ID: ${value}`);
    }

    const food = await this.foodModel.findOne({
      id: value,
    });

    if (!food) {
      throw new NotFoundException();
    }

    return food;
  }
}
