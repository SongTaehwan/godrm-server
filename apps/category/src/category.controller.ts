import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 불러오기' })
  @Get()
  getHello(): string {
    return this.categoryService.getHello();
  }
}
