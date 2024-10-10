import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@/config/config.service';
import { Logger } from '@nestjs/common';
import { isDev } from '@/utils/execution';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', '*']
  });

  app.setGlobalPrefix('api');

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
    dotfiles: 'ignore'
  });

  patchNestJsSwagger();

  // TODO: set application name
  const config = new DocumentBuilder()
    .setTitle('application name')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // TODO: set application's doc name
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: "application's doc name"
  });

  const PORT = configService.get('PORT');
  await app.listen(PORT);

  const loggerService = new Logger();
  loggerService.verbose(`App start on port ${PORT}`, 'NestApplication');
  if (isDev) loggerService.verbose('App start in development mode', 'NestApplication');
}

bootstrap();
