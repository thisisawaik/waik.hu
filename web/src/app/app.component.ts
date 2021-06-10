import { Component, Injectable, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AccountComponent } from './account/account.component';
import { MessagesService } from './services/messages.service';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

//declare var zal_platform: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  tdrImage: string = "https://cdn.discordapp.com/avatars/118466559738904576/6b4610199259efab8493cafb3e049938.webp";
  istiImage: string = "https://cdn.discordapp.com/avatars/174980450543075330/68bd161e38aaaff31a57ed05bf4ea971.webp";
  walruszImage: string = "https://cdn.discordapp.com/avatars/183302720030113792/4fecad104687bc2c889bda7043276a6c.webp";
  geiszlaImage: string = "https://cdn.discordapp.com/avatars/175193667269558272/70f1d3545c7d38f4735148324c93f7ee.webp";
  currentpage: 'tdr' | 'isti' | 'walrusz' | 'geiszla' | null = null;
  onProfilePage: boolean = true;
  onHomePage: boolean = true;

  db = getFirestore();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    //private auth: AngularFireAuth,
    private msg: MessagesService,
  ) {

    //console.log(zal_platform)
    this.router.events.subscribe((event: any) => {
      if (event.url === '/profile/isti') {
        this.currentpage = 'isti';
        this.onHomePage = false;
      } else if (event.url === '/profile/norticus') {
        this.currentpage = 'tdr';
        this.onHomePage = false;
      } else if (event.url === '/profile/walrusz') {
        this.currentpage = 'walrusz';
        this.onHomePage = false;
      } else if (event.url === '/profile/geiszla') {
        this.currentpage = 'geiszla';
        this.onHomePage = false;
      } else if (event.url) {
        if (event.url === '/') {
          this.onHomePage = true;
        } else {
          this.onHomePage = false;
        }
        this.currentpage = null;
      }
    });
  }

  async ngOnInit(): Promise<void> {

    const tdrRef = doc(this.db, 'dcusers/118466559738904576'); // 118466559738904576
    const istiRef = doc(this.db, 'dcusers/174980450543075330'); // 174980450543075330
    const walruszRef = doc(this.db, 'dcusers/183302720030113792'); // 183302720030113792
    const geiszlaRef = doc(this.db, 'dcusers/175193667269558272'); // 175193667269558272

    getDoc(tdrRef).then((doc: any) => (this.tdrImage = doc.data().pp));
    getDoc(istiRef).then((doc: any) => (this.istiImage = doc.data().pp));
    getDoc(walruszRef).then((doc: any) => (this.walruszImage = doc.data().pp));
    getDoc(geiszlaRef).then((doc: any) => (this.geiszlaImage = doc.data().pp));
  }
}