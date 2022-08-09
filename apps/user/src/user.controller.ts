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
import { ApiResponse } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '../../../libs/common/pipes';
import { UserService } from './user.service';

const USER = 'user';

// TODO: Auth 필요 (JWT check)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: HttpStatus.OK, description: '유저 정보 불러오기' })
  @Get(':id')
  get(@Param('id', MongoIdValidationPipe) id: string) {
    return this.userService.getById(id);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '유저 정보 불러오기' })
  @Get(USER)
  getAll() {
    return this.userService.getAll();
  }

  // TODO: Public API
  // TODO: JWT 토큰에서 UUID 가져와 유저 조회 후 ID 넘기기
  @ApiResponse({ status: HttpStatus.OK, description: '유저 생성' })
  @Post(USER)
  create(@Body('id', ParseUUIDPipe) id: string) {
    return this.userService.create(id);
  }

  @ApiResponse({ status: HttpStatus.OK, description: '유저 삭제' })
  @Delete(USER)
  delete(@Body('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
