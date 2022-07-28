import { Controller, Get } from '@nestjs/common';
import { FavouriteService } from './favourite.service';

@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Get()
  getHello(): string {
    return this.favouriteService.getHello();
  }
}
