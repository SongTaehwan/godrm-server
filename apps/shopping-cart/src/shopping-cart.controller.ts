import {
  Get,
  Body,
  Patch,
  Delete,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '../../../libs/common/pipes';
import { ShoppingCartService } from './shopping-cart.service';

const CART = 'cart';

@Controller()
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: '장바구니 데이터 불러오기',
  })
  @Get(CART)
  // TODO: token 을 통해 불러온 유저 정보 삽입 및 장바구니 조회
  get() {
    return this.shoppingCartService.getCartByUser('123');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '장바구니 목록에 아이템 추가',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '추가할 아이템이 존재하지 않음',
  })
  @Patch(':id')
  update(@Body('id', MongoIdValidationPipe) id: string) {
    return this.shoppingCartService.addItem(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '장바구니 목록 아이템 삭제',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '삭제할 아이템 없음',
  })
  @Delete(':id')
  deleteItem(@Body('id', MongoIdValidationPipe) id: string) {
    // INFO: 장바구니 테이블 삭제는 User 삭제 시 삭제
    return this.shoppingCartService.deleteItem(id);
  }
}
