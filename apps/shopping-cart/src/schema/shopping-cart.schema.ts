import { Document, Model, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { DEFAULT_SCHEMA_OPTIONS } from '../../../../libs/constants/schema';
import { User } from '../../../user/src/schema/user.schema';
import { Food } from 'apps/food/src/schema/food.schema';

export type ShoppingCartDocument = ShoppingCart & Document;
export type ShoppingCartModel = Model<ShoppingCartDocument>;

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class ShoppingCart {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Food.name,
    required: true,
    default: [],
  })
  food: Food[];
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
