import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import {
  ShoppingCart,
  ShoppingCartSchema,
} from '../../shopping-cart/src/schema/shopping-cart.schema';

import {
  Favourite,
  FavouriteSchema,
} from '../../favourite/src/schema/favourite.schema';
import {
  Category,
  CategorySchema,
} from '../../category/src/schema/category.schema';

import { Food, FoodSchema } from '../../food/src/schema/food.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
      { name: Favourite.name, schema: FavouriteSchema },
      { name: Food.name, schema: FoodSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
