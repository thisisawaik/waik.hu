import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getAnalytics, setUserId } from '@firebase/analytics';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getApp } from 'firebase/app'

import { AccountComponent } from '../account/account.component';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss'],
})
export class ProfileIconComponent implements OnInit {
  userpp!: string;
  auth = getAuth(getApp())

  constructor(private msg: MessagesService, private dialog: MatDialog) {

    onAuthStateChanged(this.auth, (user) => {
      const defavatar =
        'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/demo%2Fpp%2Fdemo.png?alt=media&token=93fec366-cc41-45e0-9ad1-f6a399cc750c';
      if (user) {
        setUserId(getAnalytics(), user.uid);
        this.userpp = user.photoURL ? user.photoURL : defavatar;
        this.msg.success(
          `Bejelentkezve mint: ${user.displayName}(${user.email})`
        );
      } else {
        this.userpp = defavatar;
      }
    });
  }

  ngOnInit(): void {}

  openProfile() {
    this.dialog.open(AccountComponent, {
      minWidth: 600,
    });
  }

  ppError() {
    this.userpp =
      'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/demo%2Fpp%2Fdemo.png?alt=media&token=93fec366-cc41-45e0-9ad1-f6a399cc750c';
  }
}
