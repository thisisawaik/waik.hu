import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, refFromURL } from 'firebase/database';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
    onValue(refFromURL(this.rdb, `https://waik.europe-west1.firebasedatabase.app/admin/sync`), (res) => {
      this.rolesync.all = res.val().all
      this.rolesync.done = res.val().done
      this.rolesync.isRunning = res.val().running
      this.rolesync.startedAt = res.val().startedAt ? new Date(res.val().startedAt).toUTCString() : "Not yet started";
      this.rolesync.finishedAt = res.val().finishedAt ? new Date(res.val().finishedAt).toUTCString() : "Not yet finished";
    })

    onValue(refFromURL(this.rdb, `https://waik.europe-west1.firebasedatabase.app/admin/massadd`), (res) => {
      this.massrole.all = res.val().all
      this.massrole.done = res.val().done
      this.massrole.isRunning = res.val().running
      this.massrole.startedAt = res.val().startedAt ? new Date(res.val().startedAt).toUTCString() : "Not yet started";
      this.massrole.finishedAt = res.val().finishedAt ? new Date(res.val().finishedAt).toUTCString() : "Not yet finished";
    })
  }

}
