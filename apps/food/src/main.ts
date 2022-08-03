import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { FoodModule } from './food.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(FoodModule);
  setupSwagger(app);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('식품 API')
    .setDescription('식품 API')
    .setVersion('1.0')
    .addTag('식품')
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
