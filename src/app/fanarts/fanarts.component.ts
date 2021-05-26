import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-fanarts',
  templateUrl: './fanarts.component.html',
  styleUrls: ['./fanarts.component.scss']
})
export class FanartsComponent implements OnInit {
  
  arts: any[] = [];

  db = firebase.firestore();

  constructor() { }

  ngOnInit(): void {
    const query = this.db.collection('waik/website/fanarts').where('public', '==', true);

    query.get().then(snap => {
      console.log(snap)
      for (let doc of snap.docs) {
        this.arts.push(doc.data())        
      }
    });
  }

}
