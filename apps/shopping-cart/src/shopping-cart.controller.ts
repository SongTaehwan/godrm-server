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

import { SHOPPING_CART, ID, ID_PARAMETER, CART } from './constants';
import { MongoIdValidationPipe } from '../../../libs/common/pipes';
import { Private, User } from '../../../libs/common/decorators';
import { ShoppingCartService } from './shopping-cart.service';

@ApiTags(SHOPPING_CART)
@Private()
@Controller()
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: '유저 장바구니 목록 불러오기',
  })
  @Get(CART)
  getByUser(@User(ID) id: string) {
    return this.shoppingCartService.getCart({ user: id });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 장바구니 목록 불러오기',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '장바구니 목록 존재하지 않음',
  })
  @Get(ID_PARAMETER)
  getById(@Param(ID, MongoIdValidationPipe) id: string) {
    return this.shoppingCartService.getCart({ id });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 장바구니 목록 불러오기',
  })
  @Get(`${ID_PARAMETER}/items`)
  getCartItems(@Param(ID, MongoIdValidationPipe) id: string) {
    return this.shoppingCartService.getItems(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '장바구니 목록 생성',
  })
  @Post(CART)
  create(@User(ID) id: string) {
    return this.shoppingCartService.create(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '장바구니 목록에 아이템 추가',
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
    return this.shoppingCartService.addItem({ id, itemId });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '장바구니 목록 아이템 삭제',
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
    return this.shoppingCartService.removeItem({ id, itemId });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 장바구니 목록 데이터 삭제',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '삭제할 장바구니 목록 없음',
  })
  @Delete(ID_PARAMETER)
  delete(@Param(ID, MongoIdValidationPipe) id: string) {
    return this.shoppingCartService.delete({ id });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API 요청한 사용자의 장바구니 목록 데이터 삭제',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '삭제할 장바구니 목록 없음',
  })
  @Delete(CART)
  deleteByUser(@User(ID) id: string) {
    return this.shoppingCartService.delete({ user: id });
  }
}
