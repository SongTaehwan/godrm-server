import { Module } from '@nestjs/common';

import { DatabaseConnectionModule } from '../../../libs/database-connection/src';
import { AppValidationProvider } from '../../../libs/common/providers';
import { FoodModule } from './food.module';

@Module({
  imports: [DatabaseConnectionModule, FoodModule],
  providers: [AppValidationProvider],
})
export class AppModule {}
