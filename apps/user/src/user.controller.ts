import {
  Get,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '../../../libs/common/pipes';
import { Private, User } from '../../../libs/common/decorators';
import { UserService } from './user.service';

const USERS = 'users';

@ApiTags('User')
@Private()
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: HttpStatus.OK, description: '유저 목록 불러오기' })
  @Get(USERS)
  getAll() {
    return this.userService.getAll();
  }

  @ApiResponse({ status: HttpStatus.OK, description: '유저 정보 불러오기' })
  @Get(':id')
  get(@Param('id', MongoIdValidationPipe) id: string) {
    return this.userService.getById(id);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '유저 생성' })
  @Post(USERS)
  create(@Body('id', ParseUUIDPipe) id: string) {
    return this.userService.create(id);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '유저 삭제' })
  @Delete(USERS)
  delete(@User('id', MongoIdValidationPipe) id: string) {
    return this.userService.delete(id);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '특정 유저 삭제' })
  @Delete(':id')
  deleteById(@Param('id', MongoIdValidationPipe) id: string) {
    return this.userService.delete(id);
  }
}
