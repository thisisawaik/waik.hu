import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Meta, Title } from '@angular/platform-browser';
import { getDocs, getFirestore, where } from '@firebase/firestore';
import { collection, query } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fanarts',
  templateUrl: './fanarts.component.html',
  styleUrls: ['./fanarts.component.scss'],
})
export class FanartsComponent implements OnInit {
  arts: ArtInterface[] = [];

  selectedIndex = 1;
  pages: string[] = ["arts", "upload", "comp", "admin"];

  isAdmin: boolean = false;

  db = getFirestore();
  auth = getAuth();

  tabsBackgroundColor: ThemePalette = 'primary';

  constructor(
    private htmltitle: Title,
    private meta: Meta,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events.subscribe((event: any) => {
      console.log(event);
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.page) {
      this.selectedIndex = this.pages.indexOf(this.route.snapshot.queryParams.page);
    } else {
      this.router.navigate([], {
        queryParams: {
          page: 'arts'
        }
      })
    }
    
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        await user.getIdTokenResult(true).then((res) => {
          if (res.claims.waikAdmin) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        });
      }
    });

    this.htmltitle.setTitle('Fanartok');

    this.update()
  }

  async update() {
    const q = query(
      collection(this.db, 'waik/website/fanarts'),
      where('status', '==', 'PUBLIC')
    );
    const a: any[] = [];
    getDocs(q).then((snap) => {
      //console.log(snap)
      for (let doc of snap.docs) {
        const data: any = doc.data();
        a.push(data);
      }
      this.arts = a;
    });
  }

  setPage(name: string) {
    this.router.navigate([], {
      queryParams: {
        page: name
      }
    })
  }

  detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }
}

export interface ArtInterface {
  id: string;
  shareid?: string;
  imageurl?: string;
  gsURL?: string;
  getFromGS: boolean;
  author: string;
  downloadurl?: string;
  desc?: string;
}
