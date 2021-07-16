import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { Meta, Title } from '@angular/platform-browser';

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
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.isFromPhone = this.detectMob();
    //const coll = this.db.collection('waik').doc('website').collection('downloads', (ref) => ref.orderBy('timestamp'));
    this.htmltitle.setTitle('Waik | Letöltések');
    this.meta.addTag({ property: 'og:title', content: 'Waik | Letöltések' });
    this.meta.addTag({
      property: 'og:image',
      content:
        'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/waik%2Fpublic%2Fwaik_cup.jpg?alt=media&token=5c3a6c28-644a-492a-ba4d-74d9e52470e2',
    });
    this.meta.addTag({
      property: 'og:description',
      content: 'Itt találhatóak a letölthető dolgok a waik csapattal kapcsolatban',
    });
    this.meta.addTag({ property: 'twitter:site', content: 'https://waik.hu/' });
    this.meta.addTag({
      property: 'twitter:creator',
      content: '@zal1000original',
    });
    this.meta.addTag({ property: 'twitter:image:alt', content: 'Waik' });
    this.meta.addTag({ property: 'fb:app_id', content: '581458672492860' });
    this.meta.addTag({ property: 'og:url', content: 'https://waik.hu/' });
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
