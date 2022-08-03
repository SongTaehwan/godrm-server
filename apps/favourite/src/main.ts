import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { FavouriteModule } from './favourite.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(FavouriteModule);
  setupSwagger(app);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('즐겨찾기 API')
    .setDescription('즐겨찾기 API')
    .setVersion('1.0')
    .addTag('즐겨찾기')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
