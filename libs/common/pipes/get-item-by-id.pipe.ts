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
  Item,
  ItemModel,
  ItemDocument,
} from '../../../apps/item/src/schema/item.schema';

@Injectable()
export class GetItemById
  implements PipeTransform<string, Promise<ItemDocument>>
{
  constructor(
    @InjectModel(Item.name)
    private itemModel: ItemModel,
  ) {}

  async transform(
    value: string,
    metadata: ArgumentMetadata,
  ): Promise<ItemDocument> {
    if (!isMongoId(value)) {
      throw new BadRequestException(`Invalid ID: ${value}`);
    }

    const item = await this.itemModel.findOne({
      id: value,
    });

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }
}
