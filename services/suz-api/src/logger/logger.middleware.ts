'use strict';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      const diff = process.hrtime(startAt);
      const responseTime = Math.round(diff[0] * 1e3 + diff[1] * 1e-6);
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${responseTime}ms ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}