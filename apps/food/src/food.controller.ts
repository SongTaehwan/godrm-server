import {
  Get,
  Post,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '../../../libs/common/pipes';
import { FoodService } from './food.service';

const FOOD = 'food';

@Controller()
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 데이터 생성' })
  @Post(FOOD)
  create() {
    return this.foodService.create();
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 불러오기' })
  @Get(FOOD)
  getAll() {
    return this.foodService.getAll('');
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 업데이트' })
  @Patch(FOOD)
  update() {
    return this.foodService.update();
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 삭제' })
  @Delete(':id')
  delete(@Param('id', MongoIdValidationPipe) id: string) {
    return this.foodService.delete(id);
  }
}
