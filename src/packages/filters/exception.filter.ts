import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      let message = exception.message;
      if (exception instanceof BadRequestException) {
        if (!message) {
          message = '잘못된 요청입니다.';
        }
      } else if (exception instanceof UnauthorizedException) {
        message = 'API 접근 권한이 없습니다.';
      } else if (exception instanceof ForbiddenException) {
        message = 'API 접근이 금지됐습니다.';
      } else if (exception instanceof NotFoundException) {
        message = 'API를 찾을 수 없습니다.';
      } else if (exception instanceof InternalServerErrorException) {
        message = '서버 오류가 발생했습니다.';
      }

      const status = exception.getStatus();
      response.status(status).json({
        code: -1,
        message,
        data: {},
      });
    }
  }
}
