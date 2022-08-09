import { Module } from '@nestjs/common';
import { FoodModule } from 'apps/food/src/food.module';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

@Module({
  imports: [FoodModule],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
