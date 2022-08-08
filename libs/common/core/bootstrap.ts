import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

type AppConfigurator = (app: INestApplication) => void;

export async function bootstrapApp(
  module: any,
  configure?: AppConfigurator,
): Promise<INestApplication> {
  const app = await NestFactory.create(module);

  app.setGlobalPrefix('dev');
  configure && configure(app);

  await app.listen(3000);

  return app;
}

export async function bootstrapServerlessApp(
  module: any,
  configure?: AppConfigurator,
): Promise<Handler> {
  const app = await NestFactory.create(module);

  configure && configure(app);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();

  return serverlessExpress({ app: expressApp });
}

export const createServerlessApp = (
  module: any,
  configure?: AppConfigurator,
) => {
  let server: Handler;

  return async (event: any, context: Context, callback: Callback) => {
    server = server ?? (await bootstrapServerlessApp(module, configure));
    return server(event, context, callback);
  };
};
