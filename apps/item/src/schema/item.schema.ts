import { Document, Model, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { DEFAULT_SCHEMA_OPTIONS } from '../../../../libs/constants/schema';
import { Category } from '../../../category/src/schema/category.schema';
import { User } from '../../../user/src/schema/user.schema';
import { StorageType } from '../dto/create-item.dto';

export type ItemDocument = Item & Document;
export type ItemModel = Model<ItemDocument>;

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class Item {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Category.name,
    required: true,
    default: null,
  })
  category: Category;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User | string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    enum: StorageType,
    default: StorageType.CHILLED,
  })
  storage_type: StorageType;

  @Prop({
    required: true,
    default: false,
  })
  expired: boolean;

  @Prop({
    default: 1,
  })
  quantity: number;

  @Prop({
    default: 0,
  })
  price: number;

  @Prop({
    default: null,
  })
  expired_at: Date;

  @Prop({
    default: null,
  })
  purchased_at: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
