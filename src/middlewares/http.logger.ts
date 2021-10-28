import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export class HttpMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl } = req;
    const ip = req.header('x-forwarded-for') || req.ip.split(':')[3];
    const userAgent = req.get('user-agent') || '';
    const start = new Date().getMilliseconds();
    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const now = new Date().getMilliseconds();
      //   :param:date[iso] :status :method :url :response-time ms :res[content-length] bytes
      let params = '';
      let querys = '';
      let bodys = '';
      if (Object.keys(req.body).length !== 0) {
        bodys = `body: ${JSON.stringify(req.body)}\n`;
      }
      if (Object.keys(req.params).length !== 0) {
        params = `params: ${JSON.stringify(req.params)}\n`;
      }
      if (Object.keys(req.query).length !== 0) {
        querys = `query: ${JSON.stringify(req.query)}\n`;
      }
      const args = `${params}${querys}${bodys}`;
      console.log(args.slice(0, -1));
      this.logger.log(`${ip} ${statusCode} ${method} ${originalUrl} ${now - start} ms`);
    });

    next();
  }
}
