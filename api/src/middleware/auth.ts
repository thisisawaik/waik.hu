import { Request, Response, NextFunction } from "express";
import { auth } from 'firebase-admin'

export default async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.headers);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

export const autoRegister = true;