import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiResponse({ status: HttpStatus.OK, description: '장바구니 정보 불러오기' })
  @Get()
  getHello(): string {
    return this.shoppingCartService.getHello();
  }
}
