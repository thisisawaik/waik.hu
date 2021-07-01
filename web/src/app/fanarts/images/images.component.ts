import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from 'src/app/services/messages.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { AccountComponent } from 'src/app/account/account.component';

import 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFunctions, httpsCallable } from '@firebase/functions';
import { getDatabase, onValue, ref } from 'firebase/database';
import * as storage from 'firebase/storage';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit, OnDestroy {
  liked: boolean = false;
  shareable: boolean = false;
  shareclass: string = 'red';
  sharetext: string = 'Megosztás';
  //shareid: string | undefined;
  authorAvatar: string | undefined;
  authorName: string | undefined;
  likes: number = 0;
  submitclass: string = 'red';

  greenbackground: boolean = false;

  db = getFirestore();
  auth = getAuth();
  funcions = getFunctions();
  rdb = getDatabase();

  likeListener: any;

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
  @Input() desc?: string = "Loading...";

  async ngOnInit(): Promise<void> {
    if (this.shareid) {
      this.shareable = true;
    }
    console.log(this.gsurl)
    if(this.getFromGS && this.gsurl) {
      const ref = storage.ref(storage.getStorage(), this.gsurl);
      const url = await storage.getDownloadURL(ref);
      console.log(url);
      this.imageurl = url ? url : this.imageurl;
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
    const likesref = ref(this.rdb, `fanarts/${this.id}`);
    this.likeListener = onValue(likesref, snap => {
      //console.log(snap.val())
      this.likes = snap.val().likes;
    })
    const user = this.auth.currentUser;
    const likeRef = doc(
      this.db,
      `waik/website/fanarts/${this.id}/likes/${user?.uid}`
    );
    const likeDoc = await getDoc(likeRef);
    if (user && likeDoc.exists()) {
      this.liked = true;
    }
  }

  ngOnDestroy() {
    this.likeListener();
  }

  open() {
    const dialogref = this.dialog.open(ImageDialogComponent, {
      data: {
        id: this.id,
      },
    });

    dialogref.afterClosed().subscribe((res) => {
      console.log(res);
    });

  }

  async like() {
    const user = this.auth.currentUser;
    if (!user) {
      this.dialog.open(AccountComponent, {
        minWidth: 600,
      });
    } else {
      this.liked = true;
      this.likes = this.likes + 1;
      httpsCallable(
        this.funcions,
        'waikFanartAddLike'
      )({ postId: this.id })
        .then((res) => {
          //console.log(res);
          //this.msg.success('Like hozzáadva!');
        })
        .catch((e) => {
          this.msg.error(`Hiba like-olás közben! (${e.message})`);
          console.error(e);
          this.liked = false;
          this.likes = this.likes - 1;

        });
      /*
      const token = await this.authServ.getAuthToken();
      this.liked = true;
      this.http
        .post(
          `${environment.apiUrl}/like/${this.id}?uid=${user?.uid}&token=${token}`,
          {}
        )
        .subscribe(
          (res) => {
            this.msg.success('Like hozzáadva!');
          },
          (err) => {
            this.msg.error(`Hiba like-olás közben! (${err.message})`);
            this.liked = false;
          }
        );
      */
    }
  }

  async dislike() {
    const user = this.auth.currentUser;
    if (!user) {
      this.dialog.open(AccountComponent, {
        minWidth: 600,
      });
    } else {
      this.liked = false;
      httpsCallable(
        this.funcions,
        'waikFanartLikeRemove'
      )({ postId: this.id })
        .then((res) => {
        })
        .catch((err) => {
          this.msg.error(`Hiba like visszavonása közben! (${err.message})`);
          this.liked = true;
        });
    }
  }

  share() {
    const link = `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ''
    }/share/${this.shareid}`;
    this.clipboard.copy(link);
    this.msg.success(`Link másolva a vágólapra! (${link})`);
    this.shareclass = 'green';
    this.sharetext = 'Link a vágólapon';

    setTimeout(() => {
      this.shareclass = 'red';
      this.sharetext = 'Megosztás';
    }, 5000);
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
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
  }
}
