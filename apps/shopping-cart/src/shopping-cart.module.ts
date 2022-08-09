import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { FoodModule } from '../../food/src/food.module';

import {
  ShoppingCart,
  ShoppingCartSchema,
} from './schema/shopping-cart.schema';
import { Food, FoodSchema } from '../../food/src/schema/food.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingCart.name, schema: ShoppingCartSchema },
      { name: Food.name, schema: FoodSchema }, // FoodModule 안에 같은 코드가 있더라도 이곳에 명시해야함
    ]),
    FoodModule,
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule {}
