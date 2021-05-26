import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MessagesService } from '../services/messages.service';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
})
export class DownloadsComponent implements OnInit {
  colldata: Docdata[] = [];

  db = firebase.firestore();

  constructor(
    private htmltitle: Title,
    private msg: MessagesService,
  ) {}

  ngOnInit(): void {

    //const coll = this.db.collection('waik').doc('website').collection('downloads', (ref) => ref.orderBy('timestamp'));
    this.htmltitle.setTitle('Letöltések');
    const q = this.db.collection('waik/website/downloads').orderBy('timestamp');
    
    q.get().then(coll => {
      for (const doc of coll.docs) {
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
