import { Component, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {

  colldata: Docdata[] = [];

  constructor(private db: AngularFirestore, private analitycs: AngularFireAnalytics) { }

  ngOnInit(): void {
    const coll = this.db.collection('waik').doc('website').collection('downloads', ref => ref.orderBy("timestamp"));

    coll.get().toPromise().then(async docs => {
      for await (const doc of docs.docs) {
        const docdata: any = doc.data();
        this.colldata.push(docdata);
      }
    })
  }
}

interface Docdata {
  desc: string | null,
  downloadgs: string | null,
  downloadurl: string | null,
  githuburl: string | null,
  imageurl: string | null,
  name: string,
}