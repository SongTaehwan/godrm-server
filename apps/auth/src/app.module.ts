import { ConfigModule } from '@nestjs/config';
import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';

import {
  JwtAuthProvider,
  AppValidationProvider,
} from '../../../libs/common/providers';
import { createLoggerFactory } from '../../../libs/common/middlewares/Incoming-request-log.middleware';
import { DatabaseConnectionModule } from '../../../libs/database-connection/src';
import { AuthModule } from './auth.module';

const ENV_LOCAL = '.env.local';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ENV_LOCAL],
    }),
    DatabaseConnectionModule,
    AuthModule,
  ],
  providers: [AppValidationProvider, JwtAuthProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createLoggerFactory(AuthModule.name))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
