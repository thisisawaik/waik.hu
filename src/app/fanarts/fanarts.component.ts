import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Meta, Title } from '@angular/platform-browser';
import { getDocs, getFirestore, where } from '@firebase/firestore';
import { collection, query } from 'firebase/firestore';

@Component({
  selector: 'app-fanarts',
  templateUrl: './fanarts.component.html',
  styleUrls: ['./fanarts.component.scss'],
})
export class FanartsComponent implements OnInit {
  arts: any[] = [];

  db = getFirestore();

  tabsBackgroundColor: ThemePalette = 'primary';

  constructor(private htmltitle: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.htmltitle.setTitle('Fanartok');

    const q = query(
      collection(this.db, 'waik/website/fanarts'),
      where('status', '==', 'PUBLIC')
    );

    getDocs(q).then((snap) => {
      //console.log(snap)
      for (let doc of snap.docs) {
        this.arts.push(doc.data());
      }
    });
  }
}
