

import { Request, Response } from "express";
import { firestore } from 'firebase-admin'
export default async (req: Request, res: Response): Promise<Response> => {
    const user = res.locals.user;
    const postId = req.params.postId;
    const ref = firestore().collection('waik/website/fanarts').doc(postId);
    try {
        const doc = await ref.get();
        if (!doc.exists) {
            return res.status(404).send('Post not found');
        }
        if (doc.data()?.status !== 'PUBLIC' && doc.data()?.author !== user.uid) {
            return res.status(403).send('Forbidden');
        }
        return res.json(doc.data());
    } catch (error) {
        throw new Error(error);        
    }

}

export const autoRegister = true;