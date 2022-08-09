import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Favourite, FavouriteSchema } from './schema/favourite.schema';
import { FavouriteController } from './favourite.controller';
import { FavouriteService } from './favourite.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favourite.name, schema: FavouriteSchema },
    ]),
  ],
  controllers: [FavouriteController],
  providers: [FavouriteService],
  exports: [FavouriteService],
})
export class FavouriteModule {}
