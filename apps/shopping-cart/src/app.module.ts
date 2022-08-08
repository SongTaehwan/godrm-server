import { Module } from '@nestjs/common';

import { DatabaseConnectionModule } from '../../../libs/database-connection/src';
import { AppValidationProvider } from '../../../libs/common/providers';
import { ShoppingCartModule } from './shopping-cart.module';

@Module({
  imports: [DatabaseConnectionModule, ShoppingCartModule],
  providers: [AppValidationProvider],
})
export class AppModule {}
