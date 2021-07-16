import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { AccountComponent } from 'src/app/account/account.component';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ImageDialogComponent } from '../../image-dialog/image-dialog.component';
import { Clipboard } from '@angular/cdk/clipboard';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { getApp } from '@firebase/app';

@Component({
  selector: 'app-mod-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ModImageComponent implements OnInit, OnDestroy {
  //shareid: string | undefined;
  authorAvatar: string | undefined;
  authorName: string | undefined;
  title: string = 'Loading...';
  desc: string = 'Loading...';

  greenbackground: boolean = false;

  db = getFirestore();
  auth = getAuth();
  funcions = getFunctions();
  rdb = getDatabase();

  constructor(
    public dialog: MatDialog,
    private msg: MessagesService,
    private clipboard: Clipboard,
    private http: HttpClient,
    private authServ: AuthService
  ) {}

  @Input() id: string | undefined;
  @Input() imageurl: string | undefined;
  @Input() gsurl: string | undefined;
  @Input() getFromGS: boolean | undefined;
  @Input() author: string | undefined;
  @Input() shareid: string | undefined;

  async ngOnInit(): Promise<void> {
    getDoc(doc(this.db, `waik/website/fanarts/${this.id}`)).then((res) => {
      this.title = res.data()?.title ? res.data()?.title : 'Cím';
      this.desc = res.data()?.desc ? res.data()?.desc : 'Leírás';
    });
    if (this.getFromGS && this.gsurl) {
      this.imageurl = await firebase.storage().ref(this.gsurl).getDownloadURL();
    }
    if (this.author) {
      const userref = doc(this.db, `users/${this.author}`);
      getDoc(userref)
        .then((docdata) => {
          if (docdata.data()?.dcid) {
            getDoc(doc(this.db, `dcusers/${docdata.data()?.dcid}`))
              .then((doc) => {
                this.authorAvatar = doc.data()?.pp;
                this.authorName = doc.data()?.tag;
              })
              .catch((e) => this.msg.error(e.message));
          }
        })
        .catch((e) => this.msg.error(e.message));
    }
    const user = this.auth.currentUser;
  }

  ngOnDestroy() {
    // this.likeListener();
  }

  async approve() {
    const user = this.auth.currentUser;
    httpsCallable(
      this.funcions,
      'waikFanartApprove'
    )({ postId: this.id })
      .then((res) => {
        //console.log(res);
        this.msg.success('Sikeres jóváhagyás!');
      })
      .catch((e) => {
        this.msg.error(`Hiba jóváhagyás közben! (${e.message})`);
        console.error(e);
      });
  }

  async deny() {
    const user = this.auth.currentUser;
    if (!user) {
      this.dialog.open(AccountComponent, {
        minWidth: 600,
      });
    } else {
      httpsCallable(
        this.funcions,
        'waikFanartLikeRemove'
      )({ postId: this.id })
        .then((res) => {
          this.msg.success('Sikeres elutasítás!');

        })
        .catch((err) => {
          this.msg.error(`Hiba elutasítás közben! (${err.message})`);
        });
    }
  }

  share() {
    const link = `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ''
    }/share/${this.shareid}`;
    this.clipboard.copy(link);
    this.msg.success(`Link másolva a vágólapra! (${link})`);

    setTimeout(() => {}, 5000);
  }

  removeElement(array: Array<string>, elem: string) {
    var index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }
}
