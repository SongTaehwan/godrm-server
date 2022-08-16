import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryModelProvider } from '../../category/src/providers/category-model.provider';
import { ItemModelProvider } from '../../food/src/providers/Item-model.provider';
import { FavouriteModelProvider } from './providers/favourite-model.provider';
import { createLoggerFactory } from '../../../libs/common/middlewares';
import { FavouriteController } from './favourite.controller';
import { FavouriteService } from './favourite.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      FavouriteModelProvider,
      CategoryModelProvider,
      ItemModelProvider,
    ]),
  ],
  controllers: [FavouriteController],
  providers: [FavouriteService],
})
export class FavouriteModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createLoggerFactory(FavouriteModule.name))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
