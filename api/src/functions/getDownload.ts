import { firestore } from 'firebase-admin'
import { get, set } from 'quick.db'

export default async function getDownload(id: string, force?: boolean): Promise<Download> {
    if (!force) {
        const downloadDataFromCache = getFromCache(id)
        if (downloadDataFromCache) {
            return downloadDataFromCache
        }
    }

    const downloadData = await getFromFirestore(id)
    set(`downloads.${id}`, downloadData)
    return downloadData
}

async function getFromFirestore(id: string): Promise<Download> {
    const db = firestore()
    const ref = db.collection('downloads').doc(id);
    const doc = await ref.get()
    if (!doc.exists) {
        throw new Error('Download not found')
    }
    return doc.data() as Download
}

function getFromCache(id: string): Download | null {
    return get(`downloads.${id}`)
}

export interface Download {
    author?: string;
    downloadgs?: string;
    imageurl?: string;
    name: string;
    timestamp: Date;
    visible: boolean;
}

