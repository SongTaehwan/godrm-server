import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShoppingCartModelProvider } from '../../shopping-cart/src/providers/shopping-cart-model.provider';
import { FavouriteModelProvider } from '../../favourite/src/providers/favourite-model.provider';
import { createLoggerFactory } from '../../../libs/common/middlewares';
import { ItemModelProvider } from './providers/Item-model.provider';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      ItemModelProvider,
      FavouriteModelProvider,
      ShoppingCartModelProvider,
    ]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createLoggerFactory(ItemModule.name))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
