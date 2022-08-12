import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import {
  ShoppingCart,
  ShoppingCartSchema,
} from '../../../apps/shopping-cart/src/schema/shopping-cart.schema';

import {
  Favourite,
  FavouriteSchema,
} from '../../../apps/favourite/src/schema/favourite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
      { name: Favourite.name, schema: FavouriteSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
