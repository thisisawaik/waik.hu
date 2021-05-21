import { Component, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private msg: MessagesService,
    private analitycs: AngularFireAnalytics,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.ShareId;
    if (!id) {
      this.msg.error('ShareId not found!')
      this.router.navigate(['/']);
    } else {
      const ref = this.db.doc(`waik/website/shares/${id}`);
      ref.get().toPromise().then(doc => {
        if(doc.exists) {
          if(doc.data()['redirect']) {
            this.router.navigate([doc.data()['redirect']])
            this.msg.info('Átirányítás...', 1500)
          }

          if(doc.data()['analitycs_trackers']) {
            this.analitycs.logEvent('share_open', doc.data()['analitycs_trackers'])
          }

        } else {
          this.msg.error('Share not found!')
        }
      }).catch(e => {
        this.msg.error(e.message)
      })
    }
  }
}
