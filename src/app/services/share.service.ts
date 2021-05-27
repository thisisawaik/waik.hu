import { Injectable } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { getDoc, getFirestore } from '@firebase/firestore';
import { doc } from 'firebase/firestore';

const map = new Map<string, Array<MetaDefinition>>();

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  db = getFirestore();
  constructor() {
  }

  async getShareTags(id: any): Promise<Array<MetaDefinition> | undefined> {
    
    if(map.has(id)) {
      const data = map.get(id);
      return data;
    }
    
    const docref = doc(this.db, `waik/website/shares/${id}`);

    try {
      let doc: any = await getDoc(docref);
      
      if (doc.exists()) {
        if(doc.data()['tags']) {
          map.set(id, doc.data()['tags'])
        }
        return map.get(id);
      } else {
        return undefined;
      }
    } catch(e) {
      return undefined;
    }

  } 
}