import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '../../common/pipes/mongo-id-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { CategoryService } from './category.service';

const CATEGORY = 'category';

@ApiTags('Category')
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
  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 불러오기' })
  @Get(CATEGORY)
  getAll() {
    return this.categoryService.getAll();
  }

  /* 
    INFO: serverless.yml 의 function path /category/{proxy+}
    브라우저에서 https://host_url/category/:id 로 접근하면
    NestJS 는 /category 까지 / 로 인식한다.
    때문에 아래의 @Get 은 /category 를 이미 포함하고 있다.
    -> /category/":id"
  */
  @Get(':id')
  get(@Param('id', MongoIdValidationPipe) id: string): string {
    return this.categoryService.get(id);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 생성하기' })
  @Post(CATEGORY)
  create(@Body() createUserDto: CreateUserDto) {
    return this.categoryService.create();
  }

  @ApiResponse({ status: HttpStatus.OK, description: '식재료 정보 삭제하기' })
  @Delete(CATEGORY)
  delete() {
    return this.categoryService.delete();
  }
}
