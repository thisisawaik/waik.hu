import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Meta, Title } from '@angular/platform-browser';
import { getDocs, getFirestore, where } from '@firebase/firestore';
import { collection, query } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
@Component({
  selector: 'app-fanarts',
  templateUrl: './fanarts.component.html',
  styleUrls: ['./fanarts.component.scss'],
})
export class FanartsComponent implements OnInit {
  arts: ArtInterface[] = [];

  isAdmin: boolean = false;

  db = getFirestore();
  auth = getAuth();

  tabsBackgroundColor: ThemePalette = 'primary';

  constructor(private htmltitle: Title, private meta: Meta) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, async (user) => {
      if(user) {
        await user.getIdTokenResult(true).then(res => {
          if(res.claims.waikAdmin) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        })
      }
    })
    
    this.htmltitle.setTitle('Fanartok');

    const q = query(
      collection(this.db, 'waik/website/fanarts'),
      where('status', '==', 'PUBLIC'),
    );

    getDocs(q).then((snap) => {
      //console.log(snap)
      for (let doc of snap.docs) {
        const data: any = doc.data();
        this.arts.push(data);
      }
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

export interface ArtInterface  {
  id: string,
  shareid?: string,
  imageurl?: string,
  gsurl?: string,
  getFromGS: boolean,
  author: string,
  downloadurl?: string,
}