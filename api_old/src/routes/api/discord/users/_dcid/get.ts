import { Request, Response } from "express";
import { firestore } from 'firebase-admin'

const db = firestore();

export default async (req: Request, res: Response) => {
    // console.log('test')
    if (req.params.dcid) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        const doc_ref = db.collection('dcusers').doc(req.params.dcid);
        const snapshot = await doc_ref.get();
        return res.status(200).json(snapshot.data());
    }
    return res.status(404).send("not-found");
}

export const autoRegister = true;