import { Module } from '@nestjs/common';

import { DatabaseConnectionModule } from '../../../libs/database-connection/src';
import { AppValidationProvider } from '../../../libs/common/providers';
import { FoodModule } from './food.module';
import { ConfigModule } from '@nestjs/config';

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
  providers: [AppValidationProvider],
})
export class AppModule {}
