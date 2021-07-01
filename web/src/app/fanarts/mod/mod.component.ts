import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { MessagesService } from 'src/app/services/messages.service';
import { ArtInterface } from '../fanarts.component'
@Component({
  selector: 'app-fanart-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.scss']
})
export class FanartModComponent implements OnInit {

  db = getFirestore();

  arts: ArtInterface[] = [];

  constructor(private msg: MessagesService) { }

  async ngOnInit(): Promise<void> {
    this.update();
  }

  async update() {
    const q = query(collection(this.db, 'waik/website/fanarts'), where('status', '==', 'PENDING'));

    try {
      const docs = await getDocs(q);
      const a: any[] = [];
      for (const doc of docs.docs) {
        console.log(doc.data())
        a.push({
          author: doc.data()?.author,
          id: doc.id,
          getFromGS: doc.data()?.getFromGS,
          gsURL: doc.data()?.gsURL,
          shareid: doc.data()?.shareid,
          downloadurl: doc.data()?.downloadurl,
          desc: doc.data()?.desc,
        });
      }
      this.arts = a;
    } catch (e) {
      this.msg.error(e.message)
    }
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
