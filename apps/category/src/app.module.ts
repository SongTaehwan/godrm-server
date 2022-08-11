import { ConfigModule } from '@nestjs/config';
import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';

import { createLoggerFactory } from '../../../libs/common/middlewares/Incoming-request-log.middleware';
import { DatabaseConnectionModule } from '../../../libs/database-connection/src';
import { AppValidationProvider } from '../../../libs/common/providers';
import { JwtAuthProvider } from '../../../libs/common/providers';
import { CategoryModule } from './category.module';

const ENV_LOCAL = '.env.local';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ENV_LOCAL],
    }),
    DatabaseConnectionModule,
    CategoryModule,
  ],
  providers: [AppValidationProvider, JwtAuthProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createLoggerFactory(CategoryModule.name))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
