import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as admin from 'firebase-admin'

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],      
    }).compile();
    const apps = admin.apps

    if (!apps.length) {
      admin.initializeApp({
        credential: process.env.CODESPACES ? admin.credential.cert(require('../key.json')) : admin.credential.applicationDefault(),
      })
    }
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api (GET) should fali with invalid auth token', () => {
    return request(app.getHttpServer())
    .get('/api/v1')
    .set('Auth-Token', 'not-working-token')
    .expect(401)
    .expect('Unauthorized')
  })
});
