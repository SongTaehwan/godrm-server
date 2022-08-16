import {
  Get,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { FAVOURITE, ID, ID_PARAMETER, FAVOURITE_TAG } from './constants';
import { MongoIdValidationPipe } from '../../../libs/common/pipes';
import { Private, User } from '../../../libs/common/decorators';
import { FavouriteService } from './favourite.service';

@ApiTags(FAVOURITE_TAG)
@Private()
@Controller()
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: '유저 즐겨찾기 목록 불러오기',
  })
  @Get(FAVOURITE)
  getByUser(@User(ID) id: string) {
    return this.favouriteService.getCart({ user: id });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 즐겨찾기 목록 불러오기',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '즐겨찾기 목록 존재하지 않음',
  })
  @Get(ID_PARAMETER)
  getById(@Param(ID, MongoIdValidationPipe) id: string) {
    return this.favouriteService.getCart({ id });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 즐겨찾기 목록 불러오기',
  })
  @Get(`${ID_PARAMETER}/items`)
  getCartItems(@Param(ID, MongoIdValidationPipe) id: string) {
    return this.favouriteService.getItems(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '즐겨찾기 목록 생성',
  })
  @Post(FAVOURITE)
  create(@User(ID) id: string) {
    return this.favouriteService.create(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '즐겨찾기 목록에 아이템 추가',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '추가할 아이템이 존재하지 않음',
  })
  @Post(`${ID_PARAMETER}/items`)
  update(
    @Param(ID, MongoIdValidationPipe) id: string,
    @Body(ID, MongoIdValidationPipe) itemId: string,
  ) {
    return this.favouriteService.addItem({ id, itemId });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '즐겨찾기 목록 아이템 삭제',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '삭제할 아이템 없음',
  })
  @Delete(`${ID_PARAMETER}/items`)
  deleteItem(
    @Param(ID, MongoIdValidationPipe) id: string,
    @Body(ID, MongoIdValidationPipe) itemId: string,
  ) {
    return this.favouriteService.removeItem({ id, itemId });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 즐겨찾기 목록 데이터 삭제',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '삭제할 즐겨찾기 목록 없음',
  })
  @Delete(ID_PARAMETER)
  delete(@Param(ID, MongoIdValidationPipe) id: string) {
    return this.favouriteService.delete({ id });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API 요청한 사용자의 즐겨찾기 목록 데이터 삭제',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '삭제할 즐겨찾기 목록 없음',
  })
  @Delete(FAVOURITE)
  deleteByUser(@User(ID) id: string) {
    return this.favouriteService.delete({ user: id });
  }
}
