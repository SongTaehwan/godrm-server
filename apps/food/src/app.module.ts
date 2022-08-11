import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import {
  JwtAuthProvider,
  AppValidationProvider,
} from '../../../libs/common/providers';
import { DatabaseConnectionModule } from '../../../libs/database-connection/src';
import { FoodModule } from './food.module';

const ENV_LOCAL = '.env.local';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ENV_LOCAL],
    }),
    DatabaseConnectionModule,
    FoodModule,
  ],
  providers: [AppValidationProvider, JwtAuthProvider],
})
export class AppModule {}
