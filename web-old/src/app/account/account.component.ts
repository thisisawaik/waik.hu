import { Component, OnInit } from '@angular/core';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut, User } from 'firebase/auth';
import { MessagesService } from '../services/messages.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: User | null = null;

  isGoogleLinkable: boolean = false;
  isDiscordLinkable: boolean = false;

  auth = getAuth();

  constructor(private msg: MessagesService, private authserv: AuthService,) {
    onAuthStateChanged(this.auth, user => {
      if(user) {
        this.user = user;

        this.isGoogleLinkable = user.providerData.find(e => e.providerId === "google.com") ? false : true;
      } else {
        this.user = null;
      }
    })
  }

  ngOnInit(): void {
  }

  googlelogin() {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(this.auth, provider).catch(e => this.msg.error(`Sikertelen bejelentkezés! (${e.message})`));
  }

  discordLogin() {

  }

  logOut() {
    signOut(this.auth).then(() => {
      this.msg.success('Sikeres kijelentkezés!')
    }).catch(e => {
      this.msg.error(`Sikertelen kijelentkezés! (${e.message})`)
    })
  }

  getToken() {
    this.authserv.getAuthToken().then(res => {
      console.log(res);
    });
  }

  uploadnewpicture() {
    
  }

}
