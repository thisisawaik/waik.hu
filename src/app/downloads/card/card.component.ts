import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  url: string | null = null;

  constructor(private storage: AngularFireStorage, private analitycs: AngularFireAnalytics) { }

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

  ngOnInit(): void {
    if(this.gsurl) {
      this.storage.refFromURL(this.gsurl).getDownloadURL().toPromise().then(res => {
        this.url = res;
      }).catch(e => {
        console.log(e);
        if(this.dlurl) {
          this.url = this.dlurl;
        } else {
          this.url = null;
        }
      })
    } else if(this.dlurl) {
      this.url = this.dlurl;
    } else {
      this.url = null;
    }
  }

  downloadclick() {
    this.analitycs.logEvent('download_click', [
      this.url
    ]);
    open(this.url);
  }

  githubclick() {
    this.analitycs.logEvent('github_click', [
      this.github
    ]);
    open(this.github);
  }

}
