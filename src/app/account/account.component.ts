import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { MessagesService } from '../services/messages.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: firebase.default.User | null = null;

  constructor(private auth: AngularFireAuth, private msg: MessagesService, private authserv: AuthService,) {
    this.auth.onAuthStateChanged(user => {
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
    const provider = new firebase.default.auth.GoogleAuthProvider()
    this.auth.signInWithPopup(provider).catch(e => this.msg.error(`Sikertelen bejelentkezés! (${e.message})`));
  }

  discordLogin() {

  }

  logOut() {
    this.auth.signOut().then(() => {
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
