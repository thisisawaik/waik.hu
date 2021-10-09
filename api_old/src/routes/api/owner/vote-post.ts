import { Request, Response } from 'express';
import { auth, firestore } from 'firebase-admin';

const db = firestore();
export default async function (req: Request, res: Response) {
    const data: VoteData = req.body;
    if (!data.postId) {
        return res.status(400).send({ message: 'Data must include postId' });
    }
    if (!data.value) {
        return res.status(400).send({ message: 'Data must include value' });
    }
    const user: auth.UserRecord = res.locals.token;
    if (!user.customClaims?.isWaikMember) {
        return res.status(403).send({ message: 'Unauthorized' });
    }
    const postref = db.collection('waik/website/fanarts').doc(data.postId);
    const postDoc = await postref.get();
    if (!postDoc.exists) {
        return res.status(404).send({ message: 'Post not found' });
    }
    if (!postDoc.data()?.forComp) {
        return res.status(400).send({ message: 'Post is not for comp' });
    }
    const voteRef = db.collection('waik/website/fanarts').doc(data.postId).collection('votes').doc(user.uid);
    const voteDoc = await voteRef.get();
    if (voteDoc.exists) {
        return res.status(400).send({ message: 'Already voted' });
    }
    if (typeof data.value !== 'number') {
        return res.status(400).send({ message: 'Value must be a number' });
    }
    const value = data.value;
    if (value < 1 || value > 10) {
        return res.status(400).send({ message: 'Value must be between 1 and 10' });
    }
    return await voteRef.set({
        value,
        timestamp: firestore.Timestamp.now(),
        community: false,
    }).then(() => {
        return res.status(200).send({ message: 'Voted' })
    }).catch(err => {
        return res.status(500).send({ message: 'Internal server error' })
    });
}

export interface VoteData {
    postId: string;
    value: number;
}