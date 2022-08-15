import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Food, FoodSchema } from '../../food/src/schema/food.schema';
import { Category, CategorySchema } from './schema/category.schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Food.name, schema: FoodSchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
