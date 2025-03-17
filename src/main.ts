import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import config from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const doc = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, doc);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
