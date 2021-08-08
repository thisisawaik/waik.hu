import { Request, Response } from "express";
import { firestore } from "firebase-admin";

const db = firestore();

export default async (req: Request, res: Response) => {
    const query = db.collection('waik/website/fanarts').where('status', '==', 'PUBLIC').where('forComp', '==', false)
    const querySnapshot = await query.get()
    const ids = []
    for (const doc of querySnapshot.docs) {
        ids.push(doc.id)
    }
    return res.status(200).json(ids);
}

export const autoRegister = true;
