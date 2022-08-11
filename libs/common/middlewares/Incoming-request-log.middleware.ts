import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class IncomingRequestLogMiddleware implements NestMiddleware {
  static loggerName: string = 'LoggerMiddleware';

  private logger = new Logger(IncomingRequestLogMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    if (Object.keys(req.body).length > 0) {
      this.logger.log(`REQUEST BODY: ${JSON.stringify(req.body)}`);
    }

    if (Object.keys(req.query).length > 0) {
      this.logger.log(`REQUEST QUERY: ${JSON.stringify(req.query)}`);
    }

    if (Object.keys(req.params).length > 0) {
      this.logger.log(`REQUEST PARAMS: ${JSON.stringify(req.params)}`);
    }

    next();
  }
}

export const createLoggerFactory = (name: string) => {
  const logger = new Logger(name);

  return function (req: Request, res: Response, next: NextFunction) {
    if (Object.keys(req.body).length > 0) {
      logger.log(`REQUEST BODY: ${JSON.stringify(req.body)}`);
    }

    if (Object.keys(req.query).length > 0) {
      logger.log(`REQUEST QUERY: ${JSON.stringify(req.query)}`);
    }

    if (Object.keys(req.params).length > 0) {
      logger.log(`REQUEST PARAMS: ${JSON.stringify(req.params)}`);
    }

    next();
  };
};
