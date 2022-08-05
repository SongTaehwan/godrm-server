import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

import { TIMESTAMP } from '../constants';

export type CategoryDocument = Category & Document;
export type CategoryModel = Model<CategoryDocument>;

@Schema({
  autoIndex: true,
  autoCreate: true,
  timestamps: TIMESTAMP,
  toJSON: {
    virtuals: true,
    transform: (doc, ret, options) => {
      delete ret.__v;
      delete ret._id;
    },
  },
})
export class Category {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    default: null,
  })
  icon_name: string;

  @Prop({
    default: null,
  })
  user: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
