import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

import {
  bootstrapApp,
  createServerlessApp,
} from '../../../libs/common/core/bootstrap';
import { AppModule } from './app.module';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('유저 API')
    .setDescription('유저 API')
    .setVersion('1.0')
    .addTag('유저')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
}

export const handler = createServerlessApp(AppModule, (app) => {
  setupSwagger(app);
});

if (process.env.NODE_ENV === undefined) {
  bootstrapApp(AppModule, (app) => {
    setupSwagger(app);
  });
}
