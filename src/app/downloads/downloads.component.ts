import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { MessagesService } from '../messages.service';
import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";
@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
})
export class DownloadsComponent implements OnInit {
  colldata: Docdata[] = [];

  constructor(

    private htmltitle: Title,
    private msg: MessagesService,
  ) {}

  ngOnInit(): void {
    const db = getFirestore();

    //const coll = this.db.collection('waik').doc('website').collection('downloads', (ref) => ref.orderBy('timestamp'));
    this.htmltitle.setTitle('Letöltések');
    const coll = collection(db, 'waik/website/downloads')
    const q = query(coll, orderBy('timestamp'))
    
    getDocs(q).then(docs => {
      for (const doc of docs.docs) {
        const docdata: any = doc.data();
        this.colldata.push(docdata);
      }

      this.colldata.reverse();
    }).catch(e => {
      this.msg.error(e.message)
    });
  }
}

interface Docdata {
  desc: string | null;
  downloadgs: string | null;
  downloadurl: string | null;
  githuburl: string | null;
  imageurl: string | null;
  name: string;
  shareid: string | null;
  author: string | undefined;
}
