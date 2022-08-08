import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { DatabaseConnectionModule } from '../../../libs/database-connection/src';
import { AppValidationProvider } from '../../../libs/common/providers';
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
  providers: [AppValidationProvider],
})
export class AppModule {}
