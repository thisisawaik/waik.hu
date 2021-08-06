import { Request, Response } from "express";
import { firestore } from 'firebase-admin'

const db = firestore();

export default async (req: Request, res: Response) => {
    // console.log('test')
    if (req.params.dcid) {
        console.log(res.locals.decodedToken)
        const doc_ref = db.collection('dcusers').doc(req.params.dcid);
        const snapshot = await doc_ref.get();
        return res.status(200).json(snapshot.data());
    }
    return res.status(404).send("not-found");
}

export const autoRegister = true;