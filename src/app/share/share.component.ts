import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../messages.service';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebaseapp';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private msg: MessagesService,
    private meta: Meta,

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.ShareId;
    if (!id) {
      this.msg.error('ShareId not found!');
      this.router.navigate(['/']);
    } else {
      const db = getFirestore(app)
      const d = doc(db, `waik/website/shares/${id}`)
      getDoc(d).then((doc: any) => {
        if (doc.exists()) {
          if(doc.data()['tags']) {
            for (const tag of doc.data()['tags']) {
              this.meta.addTag({ name: tag.name, content: tag.content });
            }
          }
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
