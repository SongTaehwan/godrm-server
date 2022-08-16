import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { ShoppingCartModelProvider } from '../../shopping-cart/src/providers/shopping-cart-model.provider';
import { FavouriteModelProvider } from '../../favourite/src/providers/favourite-model.provider';
import { CategoryModelProvider } from '../../category/src/providers/category-model.provider';
import { ItemModelProvider } from '../../item/src/providers/Item-model.provider';
import { UserModelProvider } from './providers/user-model.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      UserModelProvider,
      ShoppingCartModelProvider,
      FavouriteModelProvider,
      ItemModelProvider,
      CategoryModelProvider,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
