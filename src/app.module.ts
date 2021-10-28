import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpMiddleware } from './middlewares/http.logger';
import { CustomExceptionFilter } from './packages/filters/exception.filter';
import { AuthGuard } from './packages/guards/auth.guard';
import { LoggingInterceptor } from './packages/interceptors/logging.interceptor';
import { TransformInterceptor } from './packages/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'local' ? '.env' : undefined,
      ignoreEnvFile: process.env.NODE_ENV !== 'local',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('local', 'development', 'production').required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.string().required(),
        DATABASE_DATABASE: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    Logger,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpMiddleware).forRoutes('*');
  }
}
