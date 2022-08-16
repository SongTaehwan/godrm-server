import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryModelProvider } from '../../category/src/providers/category-model.provider';
import { ShoppingCartModelProvider } from './providers/shopping-cart-model.provider';
import { ItemModelProvider } from '../../item/src/providers/Item-model.provider';
import { createLoggerFactory } from '../../../libs/common/middlewares';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      ShoppingCartModelProvider,
      CategoryModelProvider,
      ItemModelProvider,
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
