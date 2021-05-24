import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from 'src/app/services/messages.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AccountComponent } from 'src/app/account/account.component';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  liked: boolean = false;
  shareable: boolean = true;
  shareclass: string = 'red';
  sharetext: string = 'Megosztás';
  authorAvatar: string | undefined;
  authorName: string | undefined;
  likes: string[] = [];
  constructor(
    public dialog: MatDialog,
    private msg: MessagesService,
    private clipboard: Clipboard,
    private db: AngularFirestore,
    private http: HttpClient,
    private authServ: AuthService,
    private auth: AngularFireAuth,
  ) {}

  @Input() id: string | undefined;
  @Input() imageurl: string | undefined;
  @Input() gsurl: string | undefined;
  @Input() getFromGS: boolean | undefined;
  @Input() author: boolean | undefined;
  @Input() shareid: boolean | undefined;

  async ngOnInit(): Promise<void> {
    if (this.author) {
      const userref = this.db.doc(`users/${this.author}`);
      userref
        .get()
        .toPromise()
        .then((doc: any) => {
          if (doc.data()['dcid']) {
            this.db
              .doc(`dcusers/${doc.data()['dcid']}`)
              .get()
              .toPromise()
              .then((doc: any) => {
                this.authorAvatar = doc.data()['pp'];
                this.authorName = doc.data()['tag'];
              })
              .catch((e) => this.msg.error(e.message));
          }
        })
        .catch((e) => this.msg.error(e.message));
    }
    
    const coll = this.db.collection('waik/website/fanarts').doc(this.id);
    coll.valueChanges().subscribe(async (snap: any) => {
      this.likes = snap.likes;
      const user = await this.auth.currentUser;
      if(user && this.likes?.length != 0) {
        if(this.likes?.find(e => e === user.uid)) {
          this.liked = true;
        }
      }
    })
    

  }

  open() {
    const dialogref = this.dialog.open(ImageDialogComponent);

    dialogref.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }

  async like() {
    const user = await this.auth.currentUser;
    if(!user) {
      this.dialog.open(AccountComponent, {
        minWidth: 600,
      });
    } else {
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
    }
  }

  async dislike() {
    const user = await this.auth.currentUser;
    if(!user) {
      this.dialog.open(AccountComponent, {
        minWidth: 600,
      });
    } else {
      this.liked = true;
      const token = await this.authServ.getAuthToken();
      this.liked = false;
      this.http
        .delete(
          `${environment.apiUrl}/like/${this.id}?uid=${user?.uid}&token=${token}`,
          {}
        )
        .subscribe(
          (res) => {
            this.msg.success('Like visszavonva!');
          },
          (err) => {
            this.msg.error(`Hiba like visszavonása közben! (${err.message})`);
            this.liked = true;
          }
        );
    }

  }

  share() {
    const link = `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ''
    }/share/${'this.shareid'}`;
    this.clipboard.copy(link);
    this.msg.success(`Link másolva a vágólapra! (${link})`);
    this.shareclass = 'green';
    this.sharetext = 'Link a vágólapon';

    setTimeout(() => {
      this.shareclass = 'red';
      this.sharetext = 'Megosztás';
    }, 5000);
  }
}
