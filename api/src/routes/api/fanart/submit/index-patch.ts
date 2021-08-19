import { Request, Response } from "express";
import { auth, appCheck, firestore } from 'firebase-admin';

export default async function (req: Request, res: Response) {
    const db = firestore();
    const appCheckToken = req.body.appCheckToken;
    if (!appCheckToken) {
        return res.status(403).send({ error: "Missing parameter 'appCheckToken'" });
    }
    return await appCheck().verifyToken(appCheckToken).catch(err => {
        return res.status(403).send({ error: "Invalid 'appCheckToken'" });
    }).then(async () => {
        const user: auth.UserRecord = res.locals.auth;
        console.log("User:", user.uid);
        if (!user) {
            return res.status(401).end();
        }
        const userRef = db.collection("users").doc(user.uid);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            return res.status(500).end();
        }
        if (!userDoc.data()?.dcid) {
            return res.status(401).end();
        }
        const dcUserRef = db.collection('dcusers').doc(userDoc.data()?.dcid);
        const dcUserDoc = await dcUserRef.get();
        if (!dcUserDoc.exists) {
            return res.status(404).end();
        }
        
        const ref = db.collection('waik/website/fanarts').doc(user.uid);
        return await ref.set({
        }).then(() => {
            return res.status(200).end();
        }).catch(err => {
            return res.status(500).send({ error: err });
        });

    });
}

export interface FanartSubmitRequest {
    id: string;
}

export const autoRegister = false;