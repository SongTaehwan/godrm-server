import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

@Module({
  imports: [],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
