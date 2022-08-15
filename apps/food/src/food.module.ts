import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Favourite,
  FavouriteSchema,
} from '../../favourite/src/schema/favourite.schema';
import {
  ShoppingCart,
  ShoppingCartSchema,
} from '../../shopping-cart/src/schema/shopping-cart.schema';

import { createLoggerFactory } from '../../../libs/common/middlewares';
import { Food, FoodSchema } from './schema/food.schema';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Food.name, schema: FoodSchema },
      { name: Favourite.name, schema: FavouriteSchema },
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
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
