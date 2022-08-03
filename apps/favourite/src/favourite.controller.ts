import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { FavouriteService } from './favourite.service';

@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 불러오기' })
  @Get()
  getHello(): string {
    return this.favouriteService.getHello();
  }
}
