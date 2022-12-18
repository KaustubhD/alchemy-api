require('dotenv').config();
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerDocument } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

function setupSwagger(app: INestApplication) {
  const document = SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('swagger', app, document);
}

bootstrap();
