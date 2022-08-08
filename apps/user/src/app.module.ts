import { Module } from '@nestjs/common';

import { DatabaseConnectionModule } from '../../../libs/database-connection/src';
import { AppValidationProvider } from '../../../libs/common/providers';
import { UserModule } from './user.module';

@Module({
  imports: [DatabaseConnectionModule, UserModule],
  providers: [AppValidationProvider],
})
export class AppModule {}
