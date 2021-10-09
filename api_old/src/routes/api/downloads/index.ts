import { Request, Response } from 'express';
import { firestore } from 'firebase-admin';

const db = firestore();

export default async function (req: Request, res: Response) {
    const downloadsRef = db.collection('downloads').where('visible', '==', true).orderBy('timestamp');
    const downloads = await downloadsRef.get();
    const a_of_d: string[] = [];
    res.setHeader('Cache-Contorl', 'public, max-age=86400');
    for (const download of downloads.docs) {
        a_of_d.push(download.id);
    }
    a_of_d.reverse()
    console.log(a_of_d);
    return res.status(200).json(a_of_d);
}

export const autoRegister = true;
