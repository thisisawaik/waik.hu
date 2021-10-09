import { Request, Response, NextFunction } from "express";
import { auth } from 'firebase-admin'

export default async (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const token: any = req.header('Auth-Token')
    if (req.path.startsWith('/api/admin/')) {
        return await auth().verifyIdToken(token).then(async (decodedToken) => {
            console.log(`Request made by admin: ${decodedToken.uid}`)
            const user = await auth().getUser(decodedToken.uid)
            if (user.customClaims?.waikAdmin) {
                return next()
            }
            return res.status(401).send('Unauthorized');
          }).catch(e => {
            console.error(e);
            return res.status(401).send('Unauthorized');
          })
    } else {
        return next();
    }

    /*
    if (token && typeof token === 'string' && token !== 'unauthenticated') {
      return await auth().verifyIdToken(token).then((decodedToken) => {
        res.locals.decodedToken = decodedToken;
        console.log(`Request made by user: ${decodedToken.uid}`)
        return next();
      }).catch(e => {
        console.error(e);
        return res.status(401).send('Unauthorized');
      })
    } else {
      console.log('Request made by unauthenticated user')
      res.locals.decodedToken = null;
      return next();
    }
    */
}

export const autoRegister = true;