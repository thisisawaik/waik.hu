import { Injectable, NestMiddleware } from '@nestjs/common';
import { auth } from 'firebase-admin'
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token: any = req.header('Auth-Token')
    if (token && typeof token === 'string' && token !== 'unauthenticated') {
      return await auth().verifyIdToken(token).then((decodedToken) => {
        res.locals.auth = decodedToken;
        console.log(`Request made by user: ${decodedToken.uid}`)
        return next();
      }).catch(e => {
        console.error(e);
        if (e.code === "auth/id-token-expired") {
          return res.status(401).send('Token expired');
        } 
        return res.status(401).send('Unauthorized');
      })
    } else {
      console.log('Request made by unauthenticated user')
      res.locals.auth = null;
      return next();
    }
  }
}
