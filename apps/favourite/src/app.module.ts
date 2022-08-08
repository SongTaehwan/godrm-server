import { Module } from '@nestjs/common';

import { DatabaseConnectionModule } from '../../../libs/database-connection/src';
import { AppValidationProvider } from '../../../libs/common/providers';
import { FavouriteModule } from './favourite.module';

@Module({
  imports: [DatabaseConnectionModule, FavouriteModule],
  providers: [AppValidationProvider],
})
export class AppModule {}
