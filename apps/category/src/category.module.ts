import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { ItemModelProvider } from '../../item/src/providers/Item-model.provider';
import { CategoryModelProvider } from './providers/category-model.provider';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature([CategoryModelProvider, ItemModelProvider]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
