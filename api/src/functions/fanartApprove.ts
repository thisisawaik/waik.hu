import { firestore, auth } from 'firebase-admin'

const db = firestore();

export default async function (user: auth.UserRecord, id: string): Promise<firestore.WriteResult> {
    if (!user) {
        throw new Error('User not found')
    }
    if (!user.customClaims?.isWaikAdmin) {
        throw new Error('Not authorized')
    }
    if (!id) {
        throw new Error('Id not found')
    }
    const docRef = db.collection('waik/website/fanarts').doc(id)
    const doc = await docRef.get();
    if (!doc.exists) {
        throw new Error('Fanart not found')
    }
    if (doc.data()?.status === "PUBLIC") {
        throw new Error('Fanart already approved')
    }
    return await docRef.update({
        status: "PUBLIC"
    })
}