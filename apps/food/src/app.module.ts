import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { DatabaseConnectionModule } from '../../../libs/database-connection/src';
import { AppValidationProvider } from '../../../libs/common/providers';
import { JwtAuthModule } from '../../../libs/jwt-auth/src';
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
    JwtAuthModule,
  ],
  providers: [AppValidationProvider],
})
export class AppModule {}
