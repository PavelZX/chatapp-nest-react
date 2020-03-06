import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as helmet from 'helmet';
import * as compression from 'compression';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // middlewares
  app.use(helmet());
  app.use(compression());
  app.use(morgan('dev'));

  // get .env variables
  const configService = app.get(ConfigService);
  const PORT = configService.get('APP_PORT');

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // swagger api docs
  const apiDocOptions = new DocumentBuilder()
    .setTitle('Chat App')
    .setDescription('Chat App documentation')
    .setVersion('1.0')
    .addTag('API v1')
    .build();
  const document = SwaggerModule.createDocument(app, apiDocOptions);
  SwaggerModule.setup('api/doc', app, document);

  // listening
  await app.listen(PORT);

  // hot reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
