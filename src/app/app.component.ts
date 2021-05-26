import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AccountComponent } from './account/account.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { MessagesService } from './services/messages.service';
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
  userpp!: string;

  constructor(
    private router: Router,
    private db: AngularFirestore,
    public dialog: MatDialog,
    private auth: AngularFireAuth,
    private msg: MessagesService,
  ) {
    this.router.events.subscribe((event: any) => {
      if (event.url === '/profile/isti') {
        this.currentpage = 'isti';
      } else if (event.url === '/profile/norticus') {
        this.currentpage = 'tdr';
      } else if (event.url === '/profile/walrusz') {
        this.currentpage = 'walrusz';
      } else if (event.url === '/profile/geiszla') {
        this.currentpage = 'geiszla';
      } else if (event.url) {
        if (event.url === '/') {
          this.onHomePage = true;
        } else {
          this.onHomePage = false;
        }
        this.currentpage = null;
      }
    });

    this.auth.onAuthStateChanged(user => {
      const defavatar = 'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/demo%2Fpp%2Fdemo.png?alt=media&token=93fec366-cc41-45e0-9ad1-f6a399cc750c';
      if(user) {
        this.userpp = user.photoURL ? user.photoURL : defavatar;
        this.msg.success(`Bejelentkezve mint: ${user.displayName}(${user.email})`)
      } else {
        this.userpp = defavatar;
      }
    })
  }

  async ngOnInit(): Promise<void> {
    const tdrRef = this.db.doc('dcusers/118466559738904576');
    const istiRef = this.db.doc('dcusers/174980450543075330'); // 174980450543075330
    const walruszRef = this.db.doc('dcusers/183302720030113792'); // 183302720030113792
    const geiszlaRef = this.db.doc('dcusers/175193667269558272'); // 175193667269558272

    tdrRef
      .get()
      .subscribe((doc: any) => (this.tdrImage = doc.data().pp));
    istiRef
      .get()
      .subscribe((doc: any) => (this.istiImage = doc.data().pp));
    walruszRef
      .get()
      .subscribe((doc: any) => (this.walruszImage = doc.data().pp));
    geiszlaRef
      .get()
      .subscribe((doc: any) => (this.geiszlaImage = doc.data().pp));
  }

  openProfile() {
    this.dialog.open(AccountComponent, {
      minWidth: 600,
    });
  }
}
