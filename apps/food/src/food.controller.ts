import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 불러오기' })
  @Get()
  getHello(): string {
    return this.foodService.getHello();
  }
}
