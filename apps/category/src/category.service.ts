import { Logger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'mongoose';

import { Category, CategoryModel } from './schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @InjectModel(Category.name) private categoryModel: CategoryModel,
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

  async getAll(): Promise<Category[]> {
    const query = this.categoryModel.find();
    const categories = await query.exec();

    return categories;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
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
    const result = await this.categoryModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException();
    }

    return {
      id: result._id,
    };
  }
}
