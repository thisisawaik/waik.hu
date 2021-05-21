import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {

  hostname = window.location.hostname;
  loading = true;
  tdrStream: SafeResourceUrl;
  istiStream: SafeResourceUrl;
  tdrChat: SafeResourceUrl;
  istiChat: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private htmltitle: Title

  ) { }

  ngOnInit(): void {
    this.htmltitle.setTitle('Streamel')
    console.log(this.hostname);
    this.tdrStream = this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.twitch.tv/?channel=norticus36&parent=${this.hostname}`);
    this.istiStream = this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.twitch.tv/?channel=isti115&parent=${this.hostname}`);
    this.tdrChat = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.twitch.tv/embed/norticus36/chat?parent=${this.hostname}`);
    this.istiChat = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.twitch.tv/embed/isti115/chat?parent=${this.hostname}`);
    this.loading = false;
  }

}
