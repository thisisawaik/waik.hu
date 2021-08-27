import { firestore, auth } from 'firebase-admin'

const db = firestore();

export default async function (user: auth.UserRecord, id: string): Promise<firestore.WriteResult> {
    if (!user) {
        throw new Error('no-user')
    }
    if (!user.customClaims?.isWaikAdmin) {
        throw new Error('not-admin')
    }
    if (!id) {
        throw new Error('no-id')
    }
    const docRef = db.collection('waik/website/fanarts').doc(id)
    const doc = await docRef.get();
    if (!doc.exists) {
        throw new Error('fanart-not-found')
    }
    if (doc.data()?.status === "PUBLIC") {
        throw new Error('already-approved')
    }
    return await docRef.update({
        status: "PUBLIC"
    })
}