import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, refFromURL } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  loading = true;
  isAdmin = false;

  rolesync = {
    all: 0,
    done: 0,
    isRunning: false,
    startedAt: "Loading...",
    finishedAt: "Loading...",
  }

  massrole = {
    all: 0,
    done: 0,
    isRunning: false,
    startedAt: "Loading...",
    finishedAt: "Loading...",
  }

  rdb = getDatabase();
  auth = getAuth();

  constructor() { }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, async (user) => {
      if(user) {
        this.loading = false;
        await user.getIdTokenResult(true).then(res => {
          if(res.claims.waikAdmin) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        })
      } else {
        this.loading = true;
      }
    })
    onValue(refFromURL(this.rdb, `https://waik.europe-west1.firebasedatabase.app/admin/sync`), (res) => {
      this.rolesync.all = res.val().all
      this.rolesync.done = res.val().done
      this.rolesync.isRunning = res.val().running
      this.rolesync.startedAt = res.val().startedAt ? new Date(res.val().startedAt).toLocaleString() : "Not yet started";
      this.rolesync.finishedAt = res.val().finishedAt ? new Date(res.val().finishedAt).toLocaleString() : "Not yet finished";
    })

    onValue(refFromURL(this.rdb, `https://waik.europe-west1.firebasedatabase.app/admin/massadd`), (res) => {
      this.massrole.all = res.val().all
      this.massrole.done = res.val().done
      this.massrole.isRunning = res.val().running
      this.massrole.startedAt = res.val().startedAt ? new Date(res.val().startedAt).toLocaleString() : "Not yet started";
      this.massrole.finishedAt = res.val().finishedAt ? new Date(res.val().finishedAt).toLocaleString() : "Not yet finished";
    })
  }

  detectMob(): boolean {
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
