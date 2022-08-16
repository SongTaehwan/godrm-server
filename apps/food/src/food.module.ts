import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShoppingCartModelProvider } from '../../shopping-cart/src/providers/shopping-cart-model.provider';
import { FavouriteModelProvider } from '../../favourite/src/providers/favourite-model.provider';
import { createLoggerFactory } from '../../../libs/common/middlewares';
import { ItemModelProvider } from './providers/Item-model.provider';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      ItemModelProvider,
      FavouriteModelProvider,
      ShoppingCartModelProvider,
    ]),
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createLoggerFactory(FoodModule.name))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
