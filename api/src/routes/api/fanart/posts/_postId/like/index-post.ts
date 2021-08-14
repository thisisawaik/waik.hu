import { Request, Response } from "express";
import { firestore, auth } from "firebase-admin";

const db = firestore();

export default async (req: Request, res: Response) => {
    const user: auth.UserRecord = res.locals.auth
    if (!user) {
        return res.status(401).end();
    }
    const postId = req.params.postId;
    const ref = db.collection('waik/website/fanarts').doc(postId)
    const doc = await ref.get();
    if (!doc.exists) {
        return res.status(404).end();
    }
    const likeref = ref.collection('likes').doc(user.uid);
    const doc2 = await likeref.get();
    if (doc2.exists) {
        return res.status(409).end();
    }
    await likeref.set({
        timestamp: firestore.Timestamp.now()
    });
    return res.status(200).json('added');
}

export const autoRegister = true;
