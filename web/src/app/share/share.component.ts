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
import { getDownloadURL } from 'firebase/storage';
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
      console.log(`waik/website/shares/${id}`);
      const d = doc(this.db, `waik/website/shares/${id}`);
      await getDoc(d)
        .then(async (resShare: any) => {
          console.log(resShare.exists());
          console.log(resShare.data());
          if (resShare.exists) {
            // if has redirect element
            if (resShare.data()['redirect']) {
              // if external
              console.log(resShare.data());
              if (resShare.data()['external']) {
                this.msg.info(
                  `Átirányítás ide: ${
                    resShare.data()['redirect'].split('?')[0] ||
                    resShare.data()['redirect']
                  }`,
                  3000
                );
                setTimeout(() => {
                  open(resShare.data()['redirect']);
                  this.router.navigate(['/']);
                }, 3000);
                // if non external
              } else {
                this.router.navigate([`${resShare.data()['redirect']}`], {
                  queryParams: { shareid: id, utm_source: 'share' },
                });
                this.msg.info('Átirányítás...', 1500);
              }
            }

            if (resShare.data()['analitycs_trackers']) {
              //this.analitycs.logEvent(
              //  'share_open',
              //  doc.data()['analitycs_trackers']
              //);
            }
            if (resShare.data()['fanart']) {
              await getDoc(doc(this.db, `waik/website/fanarts/${resShare.data()?.id}`)).then(async (resArt: any) => {
                if(resArt.data()?.getFromGs) {
                  const gsurl = await getDownloadURL(resArt.data()?.gsurl);
                  this.meta.addTag({name: 'og:image', content: gsurl})
                } else {
                  this.meta.addTag({name: 'og:image', content: resArt.data()?.downloadurl})
                }
              }).catch(e => {
                console.error(e);
                this.msg.error(`${e.message}`);
              });
              this.dialog.open(ImageDialogComponent, {
                data: {
                  id: resShare.data()['id'],
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
          this.msg.error(`${e.message}`);
          console.error(e);
        });
    }
  }
}
