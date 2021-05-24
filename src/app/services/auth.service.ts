import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) { }

  async getAuthToken(): Promise<number | null> {
    const user = await this.auth.currentUser;
    const ref = this.db.collection('tokens').doc(user?.uid);
    const doc = await ref.get().toPromise();
    const data: any = doc.data();
    return data.token ? data.token : null;
  }
}
