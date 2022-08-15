import { Logger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Query } from 'mongoose';

import { Food, FoodModel } from '../../food/src/schema/food.schema';
import { Category, CategoryModel } from './schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Category.name) private categoryModel: CategoryModel,
    @InjectModel(Food.name) private foodModel: FoodModel,
  ) {}

  private mapQuery<T, D extends Object>(query: Query<T[], T>, filterDto: D) {
    Object.entries(filterDto).forEach(([key, value]) =>
      query.where(key).equals(value),
    );

    return query;
  }

  async get(id: string): Promise<Category> {
    const query = this.categoryModel.findById(id);
    const category = await query.exec();

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async getByUser(id: string) {
    const query = this.categoryModel.find({ user: id });
    const categories = await query.exec();
    return categories;
  }

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const query = this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {
      new: true,
    });

    const update = await query.exec();

    if (!update) {
      throw new NotFoundException();
    }

    return update;
  }

  async delete(id: string) {
    const session = await this.connection.startSession();
    let result;

    await session.withTransaction(async () => {
      result = await this.categoryModel.findByIdAndDelete(id);
      const query = this.foodModel.updateMany(
        { category: id },
        { category: null },
      );
      await query.exec();
    });

    await session.endSession();

    if (!result) {
      throw new NotFoundException();
    }

    return {
      id: result._id,
    };
  }

  async deleteByUser(id: string) {
    const session = await this.connection.startSession();
    let result;

    await session.withTransaction(async () => {
      result = await this.categoryModel.deleteMany({ user: id });
      await this.foodModel.updateMany({ user: id }, { category: null });
    });

    return result;
  }
}
