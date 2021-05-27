import { Component, OnInit } from '@angular/core';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { MessagesService } from '../services/messages.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: User | null = null;

  auth = getAuth();

  constructor(private msg: MessagesService, private authserv: AuthService,) {
    onAuthStateChanged(this.auth, user => {
      if(user) {
        this.user = user;
      } else {
        this.user = null;
      }
    })
  }

  ngOnInit(): void {
  }

  googlelogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider).catch(e => this.msg.error(`Sikertelen bejelentkezés! (${e.message})`));
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

}
