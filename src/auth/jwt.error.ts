import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Response } from 'express';

@Catch(JsonWebTokenError)
export class JsonWebTokenFilter implements ExceptionFilter {
  catch(exception: JsonWebTokenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(401)
      .json({
        statusCode: 401,
        message: 'JWT must be provided',
      });
  }
}