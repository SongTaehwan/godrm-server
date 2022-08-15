import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '../../../libs/common/pipes';
import { User } from '../../../libs/common/decorators';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodService } from './food.service';

const FOOD = 'food';
const ID = 'id';
const ID_PARAMETER = ':id';

@Controller()
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 데이터 생성' })
  @Post(FOOD)
  create(@User(ID) id: string, @Body() createFoodDto: CreateFoodDto) {
    createFoodDto.user = id;
    return this.foodService.create(createFoodDto);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 목록 불러오기' })
  @Get(FOOD)
  getAll(@User(ID) id: string) {
    return this.foodService.getByUser(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 식재료 정보 불러오기',
  })
  @Get(ID_PARAMETER)
  get(@Param(ID) id: string) {
    return this.foodService.get(id);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 업데이트' })
  @Patch(ID_PARAMETER)
  update(
    @Param(ID, MongoIdValidationPipe) id: string,
    @Body() updateFoodDto: UpdateFoodDto,
  ) {
    return this.foodService.update(id, updateFoodDto);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 삭제' })
  @Delete(FOOD)
  deleteByUser(@User(ID) id: string) {
    return this.foodService.deleteByUser(id);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 삭제' })
  @Delete(ID_PARAMETER)
  delete(@Param(ID, MongoIdValidationPipe) id: string) {
    return this.foodService.delete(id);
  }
}
