import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tdrImage: string;
  istiImage: string;
  walruszImage: string;
  geiszlaImage: string;
  currentpage: 'tdr' | 'isti' | 'walrusz' | 'geiszla' | null = null;
  onProfilePage: boolean = true;

  constructor(private db: AngularFirestore, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if(event.url === "/profile/isti") {
        this.currentpage = "isti";
      } else if(event.url === "/profile/norticus") {
        this.currentpage = "tdr";
      } else if(event.url === "/profile/walrusz") {
        this.currentpage = "walrusz";
      } else if(event.url === "/profile/geiszla") {
        this.currentpage = "geiszla";
      } else if(event.url) {
        this.currentpage = null;
      }
    });
  }

  ngOnInit(): void {
    const tdrRef = this.db.collection('dcusers').doc('118466559738904576');
    const istiRef = this.db.collection('dcusers').doc('174980450543075330');
    const walruszRef = this.db.collection('dcusers').doc('183302720030113792');
    const geiszlaRef = this.db.collection('dcusers').doc('175193667269558272');

    tdrRef
      .get()
      .toPromise()
      .then((doc: any) => (this.tdrImage = doc.data().pp));
    istiRef
      .get()
      .toPromise()
      .then((doc: any) => (this.istiImage = doc.data().pp));
    walruszRef
      .get()
      .toPromise()
      .then((doc: any) => (this.walruszImage = doc.data().pp));
    geiszlaRef
      .get()
      .toPromise()
      .then((doc: any) => (this.geiszlaImage = doc.data().pp));
  }
}
