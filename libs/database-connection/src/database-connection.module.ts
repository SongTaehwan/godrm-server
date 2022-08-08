import { ConfigService, ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import databaseConfig, { DatabaseConfig } from './database.config';

const DATABASE_URI = 'database.uri';

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<DatabaseConfig>) => {
        const config = configService.get(DATABASE_URI, {
          infer: true,
        });

        return {
          uri: config,
        };
      },
    }),
  ],
})
export class DatabaseConnectionModule {}
