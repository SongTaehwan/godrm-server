import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { CATEGORY, TIMESTAMP } from '../constants';

export type CategoryDocument = Category & Document;

@Schema({
  autoIndex: true,
  autoCreate: true,
  collection: CATEGORY,
  timestamps: TIMESTAMP,
  id: true,
  _id: true,
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
