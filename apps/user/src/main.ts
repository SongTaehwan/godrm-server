import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { UserModule } from './user.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(UserModule);
  setupSwagger(app);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('유저 API')
    .setDescription('유저 API')
    .setVersion('1.0')
    .addTag('유저')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  // console.log(`Before: ${event.path}`);

  // event.path = `${event.path}/`;
  // event.path = event.path.includes('swagger-ui')
  //   ? `swagger${event.path}`
  //   : event.path;

  // console.log(`After: ${event.path}`);

  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
