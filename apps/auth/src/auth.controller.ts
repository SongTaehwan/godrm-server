import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '../../../libs/common/pipes';
import { UserModel } from '../../user/src/schema/user.schema';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { User } from './decorators/user.decorator';
import { AuthService } from './auth.service';

//* Auth 관련 Endpoint 에서만 JWT 에서 유저 아이디값 추출 및 사용
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@User() user: UserModel) {
    return this.authService.login(user);
  }
}
