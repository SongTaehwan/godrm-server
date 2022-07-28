import { Module } from '@nestjs/common';
import { FavouriteController } from './favourite.controller';
import { FavouriteService } from './favourite.service';

@Module({
  imports: [],
  controllers: [FavouriteController],
  providers: [FavouriteService],
})
export class FavouriteModule {}
