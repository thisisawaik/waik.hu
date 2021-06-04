import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../services/messages.service';
import { Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ShareService } from '../services/share.service';
import { getDoc, getDocFromCache, getFirestore } from '@firebase/firestore';
import { doc } from 'firebase/firestore';
import { ImageDialogComponent } from '../fanarts/image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  db = getFirestore();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private msg: MessagesService,
    private meta: Meta,
    private http: HttpClient,
    private share: ShareService,
    public dialog: MatDialog
  ) //private db: AngularFirestore,
  {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params.ShareId;
    if (!id) {
      this.msg.error('ShareId not found!');
      this.router.navigate(['/']);
    } else {
      const data = (
        await getDoc(doc(this.db, `waik/website/shares/${id}`))
      ).data();
      if (data?.tags) {
        let d: any = data.tags;
        this.meta.addTags(d);
      }
      const d = doc(this.db, `waik/website/shares/${id}`);
      getDoc(d)
        .then((doc: any) => {
          console.log(doc.exists());
          console.log(doc.data());
          if (doc.exists) {
            // if has redirect element
            if (doc.data()['redirect']) {
              // if external
              console.log(doc.data());
              if (doc.data()['external']) {
                this.msg.info(
                  `Átirányítás ide: ${
                    doc.data()['redirect'].split('?')[0] ||
                    doc.data()['redirect']
                  }`,
                  3000
                );
                setTimeout(() => {
                  open(doc.data()['redirect']);
                  this.router.navigate(['/']);
                }, 3000);
                // if non external
              } else {
                this.router.navigate([`${doc.data()['redirect']}`], {
                  queryParams: { shareid: id, utm_source: 'share' },
                });
                this.msg.info('Átirányítás...', 1500);
              }
            }

            if (doc.data()['analitycs_trackers']) {
              //this.analitycs.logEvent(
              //  'share_open',
              //  doc.data()['analitycs_trackers']
              //);
            }
            if (doc.data()['fanart']) {
              this.dialog.open(ImageDialogComponent, {
                data: {
                  id: doc.data()['id'],
                },
                minWidth: 600,
              });
              this.router.navigate(['/fanarts']);
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
