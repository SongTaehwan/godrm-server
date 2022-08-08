import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

import { DEFAULT_SCHEMA_OPTIONS } from '../../../../libs/constants/schema';

export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class User {
  @Prop({
    required: true,
  })
  device_uuid: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
