import { Injectable } from '@angular/core';
import { getAuth } from '@firebase/auth';

import { doc, getDoc, getFirestore } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  db = getFirestore();
  auth = getAuth();

  constructor() {}

  async getAuthToken(): Promise<number | null> {
    const user = this.auth.currentUser;
    const d = doc(this.db, `tokens/${user?.uid}`);
    const data: any = (await getDoc(d)).data();
    return data.token ? data.token : null;
  }
}
