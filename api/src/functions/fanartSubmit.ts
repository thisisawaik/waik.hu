import { auth, firestore } from 'firebase-admin';
import { FanartData } from '../types/index'
const db = firestore();

export default async function (id: string, user: auth.UserRecord): Promise<firestore.DocumentReference<firestore.DocumentData>> {
    if (!id) {
       throw new Error('id must be provided');
    }
    if (!user) {
        throw new Error('user must be provided');
    }
    const collRef = db.collection('waik/webite/fanarts')
    const oriRef = collRef.doc(id);
    const oriDoc = await oriRef.get();
    if (!oriDoc.exists) {
        throw new Error('id not found');
    }
    if (typeof oriDoc.data()?.toObject() === 'undefined') {
        throw new Error('doc empty');
    }
    const oriData: FanartData = oriDoc.data()?.toObject();

    console.log(oriData);

    return collRef.add({
        ...oriData,
    })
    
}