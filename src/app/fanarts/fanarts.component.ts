import { Component, OnInit } from '@angular/core';
import { getDocs, getFirestore, where } from '@firebase/firestore';
import { collection, query } from 'firebase/firestore';

@Component({
  selector: 'app-fanarts',
  templateUrl: './fanarts.component.html',
  styleUrls: ['./fanarts.component.scss']
})
export class FanartsComponent implements OnInit {
  
  arts: any[] = [];

  db = getFirestore();

  constructor() { }

  ngOnInit(): void {
    const q = query(collection(this.db, 'waik/website/fanarts'), where('public', '==', true));

    getDocs(q).then(snap => {
      //console.log(snap)
      for (let doc of snap.docs) {
        this.arts.push(doc.data())        
      }
    });
  }

}
