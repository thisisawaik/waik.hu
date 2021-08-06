import { Request, Response, NextFunction } from "express";
import { auth } from 'firebase-admin'

export default async (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.header('Auth-Token'))
    const token: any = req.header('Auth-Token')
    if (token && typeof token === 'string' && token !== 'unauthenticated') {
      return await auth().verifyIdToken(token).then((decodedToken) => {
        res.locals.decodedToken = decodedToken;
        return next();
      }).catch(e => {
        return res.status(401).send('Unauthorized');
      })
    } else {
      res.locals.decodedToken = null;
      return next();
    }
  }