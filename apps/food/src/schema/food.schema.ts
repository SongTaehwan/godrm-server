import { Document, Model, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { DEFAULT_SCHEMA_OPTIONS } from '../../../../libs/constants/schema';
import { Category } from 'apps/category/src/schema/category.schema';
import { User } from '../../../user/src/schema/user.schema';
import { StorageType } from '../dto/create-food.dto';

export type FoodDocument = Food & Document;
export type FoodModel = Model<FoodDocument>;

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class Food {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: Category;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
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
    required: true,
    default: 1,
  })
  quantity: number;

  @Prop({
    default: null,
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

export const FoodSchema = SchemaFactory.createForClass(Food);
