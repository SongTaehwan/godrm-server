import { Document, Model, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { DEFAULT_SCHEMA_OPTIONS } from '../../../../libs/constants/schema';
import { User } from '../../../user/src/schema/user.schema';
import { Food } from '../../../food/src/schema/food.schema';

export type FavouriteDocument = Favourite & Document;
export type FavouriteModel = Model<FavouriteDocument>;

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class Favourite {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
    unique: true,
  })
  user: User;

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: Food.name,
      required: true,
      default: [],
    },
  ])
  food: (Food | string)[];
}

export const FavouriteSchema = SchemaFactory.createForClass(Favourite);
