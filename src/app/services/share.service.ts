import { Injectable } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Observable,  } from 'rxjs'
import { firebaseappapp } from '../firebaseapp';

const map = new Map<string, Array<MetaDefinition>>();

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() {
  }

  async getShareTags(id: any): Promise<Array<MetaDefinition> | undefined> {
    
    if(map.has(id)) {
      const data = map.get(id);
      return data;
    }
    
    const db = getFirestore(firebaseappapp);
    const d = doc(db, `waik/website/shares/${id}`);

    try {
      let doc = await getDoc(d);
      
      if (doc.exists()) {
        if(doc.data()['tags']) {
          map.set(id, doc.data()['tags'])
        }
      }
    }
    catch(e)
    {
      
    }

    return undefined;
  } 
}