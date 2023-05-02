import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { urlencoded, json } from 'express';

import { AppModule } from 'app.module';
import { EnvService } from 'environment/environment.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.enableCors();

  const env = app.get<EnvService>(EnvService).get();

  Sentry.init({
    dsn: env.sentryDsn,
  });

  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(3001);
}

bootstrap();
