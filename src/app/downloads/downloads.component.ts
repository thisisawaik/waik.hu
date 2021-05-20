import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {

  colldata: Docdata[] = [];

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    const coll = this.db.collection('waik').doc('website').collection('downloads');

    coll.get().toPromise().then(async docs => {
      for await (const doc of docs.docs) {
        const docdata: any = doc.data();
      }
    })
  }
}

interface Docdata {
  desc: string | null,
  dlownloadgs: string | null,
  dlownloadurl: string | null,
  githuburl: string | null,
  imageurl: string | null,
  name: string,
}