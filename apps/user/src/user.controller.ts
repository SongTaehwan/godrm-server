import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: HttpStatus.OK, description: '유저 정보 불러오기' })
  @Get('user')
  getHello(): string {
    return this.userService.getHello();
  }
}
