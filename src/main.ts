import { NestFactory } from '@nestjs/core';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './packages/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  app.useGlobalPipes(new CustomValidationPipe());
  await app.listen(4000);
}
bootstrap();
