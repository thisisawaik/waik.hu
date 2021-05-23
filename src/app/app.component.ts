import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { app } from './firebaseapp';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tdrImage: string | undefined;
  istiImage: string | undefined;
  walruszImage: string | undefined;
  geiszlaImage: string | undefined;
  currentpage: 'tdr' | 'isti' | 'walrusz' | 'geiszla' | null = null;
  onProfilePage: boolean = true;

  constructor(private router: Router) {
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

  async ngOnInit(): Promise<void> {


    const db = getFirestore(app);

    const tdrRef = doc(db,'dcusers', '118466559738904576');
    const istiRef = doc(db,'dcusers', '174980450543075330'); // 174980450543075330
    const walruszRef = doc(db,'dcusers', '183302720030113792'); // 183302720030113792
    const geiszlaRef = doc(db,'dcusers', '175193667269558272'); // 175193667269558272


    getDoc(tdrRef).then((doc: any) => (this.tdrImage = doc.data().pp));
    getDoc(istiRef).then((doc: any) => (this.istiImage = doc.data().pp));
    getDoc(walruszRef).then((doc: any) => (this.walruszImage = doc.data().pp));
    getDoc(geiszlaRef).then((doc: any) => (this.geiszlaImage = doc.data().pp));
  }
}
