import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ShoppingCart,
  ShoppingCartSchema,
} from './schema/shopping-cart.schema';

import { createLoggerFactory } from '../../../libs/common/middlewares';
import { Food, FoodSchema } from '../../food/src/schema/food.schema';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
      { name: Food.name, schema: FoodSchema }, // FoodModule 안에 같은 코드가 있더라도 이곳에 명시해야함
    ]),
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createLoggerFactory(ShoppingCartModule.name))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
