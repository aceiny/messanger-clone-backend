import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';
import { Response } from 'express';

@Catch(TokenExpiredError)
export class TokenExpiredFilter implements ExceptionFilter {
  catch(exception: TokenExpiredError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(401)
      .json({
        statusCode: 401,
        message: 'Token expired',
      });
  }
}