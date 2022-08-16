import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { FavouriteModelProvider } from './providers/favourite-model.provider';
import { FavouriteController } from './favourite.controller';
import { FavouriteService } from './favourite.service';

@Module({
  imports: [MongooseModule.forFeature([FavouriteModelProvider])],
  controllers: [FavouriteController],
  providers: [FavouriteService],
  exports: [FavouriteService],
})
export class FavouriteModule {}
