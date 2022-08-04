import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_PIPE } from '@nestjs/core';

import { CategoryModule } from './category.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URI), CategoryModule],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          transform: true,
          forbidNonWhitelisted: true,
          validateCustomDecorators: true,
        }),
    },
  ],
})
export class AppModule {}
