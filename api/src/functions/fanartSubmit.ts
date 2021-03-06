import { auth, firestore } from 'firebase-admin';
const db = firestore();

export default async function (rid: string, user: auth.UserRecord): Promise<firestore.DocumentReference<firestore.DocumentData>> {
    const id = rid || user.uid;
    if (!id) {
       throw new Error('id must be provided');
    }
    if (!user) {
        throw new Error('user must be provided');
    }
    const userref = db.collection('users').doc(user.uid);
    const userDoc = await userref.get();
    if (!userDoc.data()?.dcid) {
        throw new Error('dc-not-linked');
    }
    const collRef = db.collection('waik/website/fanarts')
    const oriRef = collRef.doc(id);
    const oriDoc = await oriRef.get();
    if (!oriDoc.exists) {
        throw new Error('doc not found');
    }
    if (typeof oriDoc.data() === 'undefined') {
        throw new Error('doc empty');
    }

    const artsByUser = await db.collection('waik/website/fanarts').where('author', '==', user.uid).where('forComp', '==', true).get();

    if (artsByUser.docs.length > 3) {
        throw new Error('user has more than 3 fanarts');
    }

    const oriData: any = oriDoc.data();

    console.log(oriData);

    return await collRef.add({
        ...oriData,
        status: 'PENDING'
    })
    
}