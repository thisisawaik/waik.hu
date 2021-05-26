import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../services/messages.service';
import { Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ShareService } from '../services/share.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  db = firebase.firestore();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private msg: MessagesService,
    private meta: Meta,
    private http: HttpClient,
    private share: ShareService,
    //private db: AngularFirestore,
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params.ShareId;
    if (!id) {
      this.msg.error('ShareId not found!');
      this.router.navigate(['/']);
    } else {
      const data = await (await this.db.doc(`waik/website/shares/${id}`).get({source: 'cache'})).data();
      if(data) {
        let d: any = data;
        this.meta.addTags(d);
      }
      const doc = this.db.doc(`waik/website/shares/${id}`)
      doc.get().then((doc: any) => {
        if (doc.exists) {
          // if has redirect element
          if (doc.data()['redirect']) {
            // if external
            console.log(doc.data());
            if (doc.data()['external']) {
              this.msg.info(
                `Átirányítás ide: ${doc.data()['redirect'].split('?')[0] || doc.data()['redirect']}`,
                3000
              );
              setTimeout(() => {
                open(doc.data()['redirect']);
                this.router.navigate(['/']);
              }, 3000);
              // if non external
            } else {
              this.router.navigate([doc.data()['redirect']]);
              this.msg.info('Átirányítás...', 1500);
            }
          }

          if (doc.data()['analitycs_trackers']) {
            //this.analitycs.logEvent(
            //  'share_open',
            //  doc.data()['analitycs_trackers']
            //);
          }
        } else {
          this.msg.error('Share not found!');
        }
      })
      .catch((e) => {
        this.msg.error(e.message);
      });
    }
  }
}
