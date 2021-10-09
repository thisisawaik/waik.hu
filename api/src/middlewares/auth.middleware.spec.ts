import { AuthMiddleware } from './auth.middleware';
import * as request from 'supertest';

describe('AuthMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthMiddleware()).toBeDefined();
  });
});
