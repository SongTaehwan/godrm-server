import { Module } from '@nestjs/common';

import { JwtStrategy } from '../../../apps/auth/src/strategy/jwt.strategy';
import { AppAuthProvider } from '../../common/providers';

@Module({
  providers: [AppAuthProvider, JwtStrategy],
})
export class JwtAuthModule {}
