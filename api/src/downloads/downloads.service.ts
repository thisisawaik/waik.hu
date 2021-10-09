import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { get, set } from 'quick.db';

@Injectable()
export class DownloadsService {
    private readonly db = firestore()

    async getDownload(id: string, forceRefresh: boolean = false) {
        const fcache = this.getDownloadFromCache(id);
        if(fcache && !forceRefresh) {
            return { ...fcache, fromCache: true };
        }
        const fserver = await this.getDownloadFromServer(id);
        return { ...fserver, fromCache: false };
    }

    private async getDownloadFromServer(id: string) {
        const ref = this.db.collection('downloads').doc(id)
        const doc = await ref.get();
        const rawdata = doc.data();
        const timestamp = new firestore.Timestamp(rawdata.timestamp.seconds, rawdata.timestamp.nanoseconds).toDate()
        const res = { ...doc.data(), timestamp }
        set(`downloads.${id}`, res);
        return res;
    }

    private getDownloadFromCache(id: string) {
        const raw = get(`downloads.${id}`);
        const data = { ...raw, timestamp: new Date(raw.timestamp) }
        if(!data) {
            return null;
        }
        return data;
    }
}
