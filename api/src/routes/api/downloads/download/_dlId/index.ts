import { Request, Response } from 'express';
import { firestore } from 'firebase-admin';

const db = firestore();

export default async function (req: Request, res: Response) {
    const downloadsRef = db.collection('waik/website/downloads').doc(req.params.dlId);
    const download = await downloadsRef.get();
    res.setHeader('Cache-Contorl', 'public, max-age=86400');
    if (download.data()?.visible === true) {
        return res.status(200).json(download.data());
    } else if (res.locals.auth.customClaims.isWaikAdmin) {
        return res.status(200).json(download.data());
    }
    return res.status(401).send('Unauthorized');
}

export const autoRegister = true;
