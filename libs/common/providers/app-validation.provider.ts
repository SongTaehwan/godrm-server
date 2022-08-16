import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

export const AppValidationProvider = {
  provide: APP_PIPE,
  useFactory: () =>
    new ValidationPipe({
      whitelist: true,
      transform: true,
      enableDebugMessages: true,
      disableErrorMessages: false,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
    }),
};
