import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ShoppingCartModelProvider } from '../../shopping-cart/src/providers/shopping-cart-model.provider';
import { FavouriteModelProvider } from '../../favourite/src/providers/favourite-model.provider';
import { CategoryModelProvider } from '../../category/src/providers/category-model.provider';
import { UserModelProvider } from '../../user/src/providers/user-model.provider';
import { ItemModelProvider } from '../../food/src/providers/Item-model.provider';
import { AppAuthProvider } from '../../../libs/common/providers';
import { UserService } from '../../user/src/user.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TOKEN_SECRET } from './constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      UserModelProvider,
      ShoppingCartModelProvider,
      FavouriteModelProvider,
      ItemModelProvider,
      CategoryModelProvider,
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
