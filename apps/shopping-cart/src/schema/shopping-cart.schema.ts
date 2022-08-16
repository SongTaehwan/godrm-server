import { Document, Model, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { DEFAULT_SCHEMA_OPTIONS } from '../../../../libs/constants/schema';
import { User } from '../../../user/src/schema/user.schema';
import { Item } from '../../../item/src/schema/item.schema';

export type ShoppingCartDocument = ShoppingCart & Document;
export type ShoppingCartModel = Model<ShoppingCartDocument>;

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class ShoppingCart {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
    unique: true,
  })
  user: User | string;

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: Item.name,
      required: true,
      default: [],
    },
  ])
  items: (Item | string)[];
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
