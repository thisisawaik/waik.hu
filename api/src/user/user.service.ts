import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { get, set } from 'quick.db'
@Injectable()
export class UserService {
    private readonly db = firestore()

    public async getUser(id: string, forceRefresh: boolean = false) {
        const fcache = this.getUserFromCache(id);
        if(fcache && !forceRefresh) {
            return { ...fcache, fromCache: true };
        }
        const fserver = await this.getUserFromServer(id);
        return { ...fserver, fromCache: false };
    }

    private async getUserFromServer(id: string) {
        const ref = this.db.collection('dcusers').doc(id)
        const doc = await ref.get();
        set(`users.${id}`, doc.data());
        return doc.data();
    }

    private getUserFromCache(id: string) {
        const user = get(`users.${id}`)
        if(!user) {
            return null;
        }
        return user;
    }
}
