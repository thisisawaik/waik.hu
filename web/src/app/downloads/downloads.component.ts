import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MessagesService } from '../services/messages.service';

import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
})
export class DownloadsComponent implements OnInit {
  colldata: Docdata[] = [];

  isFromPhone: boolean = false;

  db = getFirestore();

  constructor(
    private htmltitle: Title,
    private msg: MessagesService,
  ) {}

  ngOnInit(): void {
    this.isFromPhone = this.detectMob();
    //const coll = this.db.collection('waik').doc('website').collection('downloads', (ref) => ref.orderBy('timestamp'));
    this.htmltitle.setTitle('Letöltések');
    const q = query(collection(this.db, 'waik/website/downloads'), where('visible', '==', true), orderBy('timestamp'));
    
    getDocs(q).then(coll => {
      for (const doc of coll.docs) {
        const docdata: any = doc.data();
        this.colldata.push(docdata);
      }

      this.colldata.reverse();
    }).catch(e => {
      this.msg.error(e.message)
    });
  }

  detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
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
