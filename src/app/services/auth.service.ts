import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  db = firebase.firestore();
  auth = firebase.auth();

  constructor() { }

  async getAuthToken(): Promise<number | null> {
    const user = await this.auth.currentUser;
    const ref = this.db.collection('tokens').doc(user?.uid);
    const doc = await ref.get();
    const data: any = doc.data();
    return data.token ? data.token : null;
  }
}
