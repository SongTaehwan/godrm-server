import { Body, Controller, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../../../libs/common/decorators/public.decorator';
import { AuthService } from './auth.service';

const AUTH = 'auth';

//* Auth 관련 Endpoint 에서만 JWT 에서 유저 아이디값 추출 및 사용
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*
    데코레이터를 통해 API 별 메타데이터가 초기화 때 저장되어 NestJS 가 관리
    특정 API 로 요청 보내면 해당 엔드포인트의 메타데이터가 설정되고 context 를 통해 접근 가능해짐
  */

  @Public()
  @Post(AUTH)
  issueToken(@Body('id', ParseUUIDPipe) id: string) {
    return this.authService.createToken(id);
  }

  @Public()
  @Post(`${AUTH}/refresh`)
  refreshToken() {
    return this.authService.refreshToken();
  }
}

// Case.1 토큰이 없는 케이스
// 1. 디바이스 ID 를 서버로 보내 토큰 발급 요청
// 2. 유저가 이미 존재하면 토큰 발급 없으면, 401
// 3. 401 응답 받으면 유저생성 요청
// 4. 토큰으로 응답

// Case.2 토큰이 있는 케이스
// 1. API 요청 시 토큰 만료
// 2. Refresh 토큰을 보내 새 토큰으로 갱신 후 다시 요청
