import { Module } from '@nestjs/common';

import { DatabaseConnectionModule } from '../../../libs/database-connection/src';
import { AppValidationProvider } from '../../../libs/common/providers';
import { CategoryModule } from './category.module';

@Module({
  imports: [DatabaseConnectionModule, CategoryModule],
  providers: [AppValidationProvider],
})
export class AppModule {}
