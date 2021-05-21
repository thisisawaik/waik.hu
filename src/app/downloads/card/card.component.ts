import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Clipboard } from '@angular/cdk/clipboard';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  url: string | null = null;
  shareable: boolean = false;
  shareclass: string = 'red';
  sharetext: string = 'Megosztás';

  constructor(
    private storage: AngularFireStorage,
    private analitycs: AngularFireAnalytics,
    private db: AngularFirestore,
    private clipboard: Clipboard,
    private meta: Meta,
  ) {}

  @Input()
  title: string = null;
  @Input()
  dlurl: string | null = null;
  @Input()
  gsurl: string | null = null;
  @Input()
  image: string | null = null;
  @Input()
  github: string | null = null;
  @Input()
  desc: string | null = null;
  @Input()
  shareid: string | null = null;

  ngOnInit(): void {
    this.meta.addTag({ name: 'twitter:card', content: '' });
    this.meta.addTag({ name: 'twitter:site', content: 'waik.hu' });
    this.meta.addTag({ name: 'twitter:creator', content: '@zal1000original' });
    this.meta.addTag({ name: 'twitter:title', content: 'Waik letöltések' });
    this.meta.addTag({ name: 'twitter:description', content: 'waik.hu letöltések oldal' });
    this.meta.addTag({ name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/waik%2Fpublic%2Fd4%2Fassets%2Fdk_4_a.png?alt=media&token=372a2b34-e5d5-4276-8892-0dcc6301ae39' });

    if (this.gsurl) {
      this.storage
        .refFromURL(this.gsurl)
        .getDownloadURL()
        .toPromise()
        .then((res) => {
          this.url = res;
        })
        .catch((e) => {
          console.log(e);
          if (this.dlurl) {
            this.url = this.dlurl;
          } else {
            this.url = null;
          }
        });
    } else if (this.dlurl) {
      this.url = this.dlurl;
    } else {
      this.url = null;
    }

    const shareref = this.db
      .collection('waik')
      .doc('website')
      .collection('shares')
      .doc(this.shareid);
    shareref
      .get()
      .toPromise()
      .then((doc) => {
        console.log(doc.exists);
        console.log(this.shareid);
        if (doc.exists) {
          this.shareable = true;
        }
      });
  }

  downloadclick() {
    this.analitycs.logEvent('download_click', [this.url]);
    open(this.url);
  }

  githubclick() {
    this.analitycs.logEvent('github_click', [this.github]);
    open(this.github);
  }

  share() {
    const shareref = this.db
      .collection('waik')
      .doc('website')
      .collection('shares')
      .doc(this.shareid);
    const link = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/share/${this.shareid}`;
    console.log(link);
    this.clipboard.copy(link);

    this.analitycs.logEvent('share_click', [this.shareid]);

    this.shareclass = 'green';
    this.sharetext = 'Link a vágólapon';
    setTimeout(() => {
      this.shareclass = 'red';
      this.sharetext = 'Megosztás';
    }, 5000);
  }
}
