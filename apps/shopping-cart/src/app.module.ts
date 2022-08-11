import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { DatabaseConnectionModule } from '../../../libs/database-connection/src';
import { AppValidationProvider } from '../../../libs/common/providers';
import { ShoppingCartModule } from './shopping-cart.module';
import { JwtAuthModule } from '../../../libs/jwt-auth/src';

const ENV_LOCAL = '.env.local';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ENV_LOCAL],
    }),
    DatabaseConnectionModule,
    ShoppingCartModule,
    JwtAuthModule,
  ],
  providers: [AppValidationProvider],
})
export class AppModule {}
