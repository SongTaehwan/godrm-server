import { Controller, Get } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Get()
  getHello(): string {
    return this.shoppingCartService.getHello();
  }
}
