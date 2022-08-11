import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export const AppAuthProvider = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};
