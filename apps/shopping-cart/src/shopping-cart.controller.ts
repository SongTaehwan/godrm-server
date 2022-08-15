import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '../../../libs/common/pipes';
import { Private, User } from '../../../libs/common/decorators';
import { ShoppingCartService } from './shopping-cart.service';

const CART = 'cart';
const ID = 'id';
const ID_PARAMETER = ':id';

@ApiTags('Shopping Cart')
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
    return this.shoppingCartService.getCartByUser(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 장바구니 목록 불러오기',
  })
  @Get(ID_PARAMETER)
  getById(@Param(ID, MongoIdValidationPipe) id: string) {
    return this.shoppingCartService.getCartById(id);
  }

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
  @Patch(ID_PARAMETER)
  update(@Body(ID, MongoIdValidationPipe) id: string) {
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
  @Delete(`${CART}/item/${ID_PARAMETER}`)
  deleteItem(@Param(ID, MongoIdValidationPipe) id: string) {
    return this.shoppingCartService.deleteItem(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '장바구니 목록 삭제',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '삭제할 장바구니 목록 없음',
  })
  @Delete(ID_PARAMETER)
  delete(@Param(ID) id: string) {
    return this.shoppingCartService.delete(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '장바구니 목록 삭제',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '삭제할 장바구니 목록 없음',
  })
  @Delete(CART)
  deleteByUser(@User(ID) id: string) {
    return this.shoppingCartService.delete(id);
  }
}
