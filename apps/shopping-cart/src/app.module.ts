import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import {
  JwtAuthProvider,
  AppValidationProvider,
} from '../../../libs/common/providers';
import { DatabaseConnectionModule } from '../../../libs/database-connection/src';
import { ShoppingCartModule } from './shopping-cart.module';

const ENV_LOCAL = '.env.local';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ENV_LOCAL],
    }),
    DatabaseConnectionModule,
    ShoppingCartModule,
  ],
  providers: [AppValidationProvider, JwtAuthProvider],
})
export class AppModule {}
