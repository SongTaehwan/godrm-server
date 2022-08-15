import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { User, UserSchema } from '../../user/src/schema/user.schema';
import { AppAuthProvider } from '../../../libs/common/providers';
import { UserService } from '../../user/src/user.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TOKEN_SECRET } from './constants';

import {
  ShoppingCart,
  ShoppingCartSchema,
} from '../../../apps/shopping-cart/src/schema/shopping-cart.schema';
import {
  Favourite,
  FavouriteSchema,
} from '../../../apps/favourite/src/schema/favourite.schema';
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
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(TOKEN_SECRET),
        signOptions: {
          expiresIn: '365d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, AppAuthProvider, JwtStrategy],
})
export class AuthModule {}
