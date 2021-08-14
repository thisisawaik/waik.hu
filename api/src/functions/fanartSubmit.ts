import { auth, firestore } from 'firebase-admin';
import { FanartData } from '../types/index'
const db = firestore();

export default async function (id: string, user: auth.UserRecord): Promise<boolean> {
    if (!id) {
       throw new Error('id must be provided');
    }
    if (!user) {
        throw new Error('user must be provided');
    }
    const oriRef = db.collection('waik/webite/fanarts').doc(id);
    const oriDoc = await oriRef.get();
    if (!oriDoc.exists) {
        throw new Error('id not found');
    }
    const oriData: FanartData = oriDoc.data();
    
}