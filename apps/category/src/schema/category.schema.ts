import { Document, Model, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { DEFAULT_SCHEMA_OPTIONS } from '../../../../libs/constants/schema';
import { User } from '../../../user/src/schema/user.schema';

export type CategoryDocument = Category & Document;
export type CategoryModel = Model<CategoryDocument>;

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class Category {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    default: null,
  })
  icon_name: string;

  @Prop([
    {
      required: true,
      type: MongooseSchema.Types.ObjectId,
      ref: User.name,
    },
  ])
  user: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
