import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-fanarts',
  templateUrl: './fanarts.component.html',
  styleUrls: ['./fanarts.component.scss']
})
export class FanartsComponent implements OnInit {
  
  arts: any[] = [];

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    const query = this.db.collection('waik/website/fanarts', ref => ref.where('public', '==', true));

    query.get().toPromise().then(snap => {
      console.log(snap)
      for (let doc of snap.docs) {
        this.arts.push(doc.data())        
      }
    });
  }

}
