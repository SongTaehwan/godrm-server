import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../../../apps/user/src/schema/user.schema';
import { JwtStrategy } from '../../../apps/auth/src/strategy/jwt.strategy';
import { createLoggerFactory } from '../../common/middlewares';
import { AppAuthProvider } from '../../common/providers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AppAuthProvider, JwtStrategy],
})
export class JwtAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createLoggerFactory(JwtAuthModule.name))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
