import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '../../../libs/common/pipes';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Private } from '../../../libs/common/decorators';
import { CategoryService } from './category.service';

const CATEGORY = 'category';
const ID = 'id';

@ApiTags('Category')
@Private()
@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /* 
    INFO: serverless.yml 의 function path /category 
    브라우저에서 https://host_url/category 로 접근하면
    NestJS 는 host_url 까지만 / 로 인식한다.
    때문에 아래의 @Get 은 /category 를 추가해야한다.
    -> /"category"
  */
  @ApiResponse({ status: HttpStatus.OK, description: '식품군 리스트 불러오기' })
  @Get(CATEGORY)
  getAll() {
    console.log('12312312');
    return this.categoryService.getAll();
  }

  /* 
    INFO: serverless.yml 의 function path /category/{proxy+}
    브라우저에서 https://host_url/category/:id 로 접근하면
    NestJS 는 /category 까지 / 로 인식한다.
    때문에 아래의 @Get 은 /category 를 이미 포함하고 있다.
    -> /category/":id"
  */
  @ApiResponse({
    status: HttpStatus.OK,
    description: '특정 식품군 데이터 불러오기',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '해당하는 정보가 존재하지 않음',
  })
  @Get(':id')
  get(@Param(ID, MongoIdValidationPipe) id: string) {
    console.log('12312312');
    return this.categoryService.get(id);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식품군 추가' })
  @Post(CATEGORY)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식품군 정보 변경' })
  @Patch(':id')
  update(
    @Param(ID, MongoIdValidationPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식품군 삭제' })
  @Delete(CATEGORY)
  delete(@Body(ID, MongoIdValidationPipe) id: string) {
    return this.categoryService.delete(id);
  }
}
