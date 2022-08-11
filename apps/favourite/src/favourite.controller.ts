import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavouriteService } from './favourite.service';

const FAVOURITE = 'favourite'

@ApiTags("Favourite")
@Controller()
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 불러오기' })
  @Get(FAVOURITE)
  getHello(): string {
    return this.favouriteService.getHello();
  }
}
