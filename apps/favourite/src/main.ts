import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

import {
  bootstrapApp,
  createServerlessApp,
} from '../../../libs/common/core/bootstrap';
import { AppModule } from './app.module';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('즐겨찾기 API')
    .setDescription('즐겨찾기 API')
    .setVersion('1.0')
    .addTag('즐겨찾기')
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
