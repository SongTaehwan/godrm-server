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
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';

const ITEM = 'item';
const ID = 'id';
const ID_PARAMETER = ':id';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 데이터 생성' })
  @Post(ITEM)
  create(@User(ID) id: string, @Body() createItemDto: CreateItemDto) {
    createItemDto.user = id;
    return this.itemService.create(createItemDto);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 목록 불러오기' })
  @Get(ITEM)
  getAll(@User(ID) id: string) {
    return this.itemService.getByUser(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 식재료 정보 불러오기',
  })
  @Get(ID_PARAMETER)
  get(@Param(ID) id: string) {
    return this.itemService.get(id);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 업데이트' })
  @Patch(ID_PARAMETER)
  update(
    @Param(ID, MongoIdValidationPipe) id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemService.update(id, updateItemDto);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 삭제' })
  @Delete(ITEM)
  deleteByUser(@User(ID) id: string) {
    return this.itemService.deleteByUser(id);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 삭제' })
  @Delete(ID_PARAMETER)
  delete(@Param(ID, MongoIdValidationPipe) id: string) {
    return this.itemService.delete(id);
  }
}
