import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';

async function bootstrap() {
  admin.initializeApp({
    credential: process.env.CODESPACES ? admin.credential.cert(require('../key.json')) : admin.credential.applicationDefault(),
  })
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(8080);
}
bootstrap();
