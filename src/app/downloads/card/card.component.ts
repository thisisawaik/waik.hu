import { Component, OnInit, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Meta, Title } from '@angular/platform-browser';
import { MessagesService } from 'src/app/messages.service';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebaseapp'
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
  authordata = {
    avatar: '',
    name: '',
  };

  constructor(
    private clipboard: Clipboard,
    private msg: MessagesService,
  ) {}

  @Input()
  title: string | null = null;
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
  @Input()
  author: string | undefined;

  ngOnInit(): void {
    const db = getFirestore(app);
    if(this.author) {
      const d = doc(db, 'dcusers', this.author);

      getDoc(d).then((doc: any) => {
        this.authordata = {
          name: doc.data()['tag'],
          avatar: doc.data()['pp'],
        }
      }).catch(e => {
        this.msg.error(e.message);
      })
    }

    if (this.gsurl) {
      const storage = getStorage(app);
      getDownloadURL(ref(storage, this.gsurl)).then((res) => {
        this.url = res;
      })
      .catch((e) => {
        console.log(e);
        if(e.code != "storage/invalid-argument") {
          this.msg.error(e.message);
        }
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

    const d = doc(db, `waik/website/shares/${this.shareid}`);
    getDoc(d).then((doc) => {
      if (doc.exists()) {
        this.shareable = true;
      }
    });
  }

  downloadclick() {
    //this.analitycs.logEvent('download_click', [this.url]);
    open(this.url!);
  }

  githubclick() {
    //this.analitycs.logEvent('github_click', [this.github]);
    open(this.github!);
  }

  share() {
    const db = getFirestore(app);
    const d = doc(db, `waik/website/shares/${this.shareid}`);
    const link = `${window.location.protocol}//${window.location.hostname}${window.location.port? `:${window.location.port}` : ''}/share/${this.shareid}`;
    this.clipboard.copy(link);
    this.msg.success(`Link másolva a vágólapra! (${link})`)

    //this.analitycs.logEvent('share_click', [this.shareid]);

    this.shareclass = 'green';
    this.sharetext = 'Link a vágólapon';
    setTimeout(() => {
      this.shareclass = 'red';
      this.sharetext = 'Megosztás';
    }, 5000);
  }
}
