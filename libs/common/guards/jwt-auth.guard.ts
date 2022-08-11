import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // canActivate 호출 중 관련 Custom Strategy 도 호출되는데 라이브러리의 Strategy 에서 request body 정보 validation 중 invalid 판단 시 canActivate 에서 error throw
    // 유효하면 Strategy 의 validate 호출 후 request.user 에 삽입
    // canActivate 종료
    return super.canActivate(context);
  }
}
