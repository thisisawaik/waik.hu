import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-walrusz',
  templateUrl: './walrusz.component.html',
  styleUrls: ['./walrusz.component.scss'],
})
export class WalruszComponent implements OnInit {
  latestvideo: any;
  currentvideoURL: any;
  videos: Array<Video>;
  getError: boolean;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  async ngOnInit(): Promise<void> {
    this.http
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC9THn_bIenAFAMhqkZ-V9Aw&maxResults=5&order=date&type=video&key=${environment.firebaseConfig.apiKey}`
      )
      .toPromise()
      .then((val: any) => {
        
        this.currentvideoURL = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${val.items[0].id.videoId}`
          );
          
          this.videos = val.items;
          this.latestvideo = val.items[0];
          console.log(val.items)
      })
      .catch((e) => {
        console.error(e);
        this.getError = true;
      });
  }

  // GET https://www.googleapis.com/youtube/v3/search?part=snippet&channelId={CHANNEL_ID}&maxResults=10&order=date&type=video&key={YOUR_API_KEY}
}

interface Video {
  id: {

  },
  snippet: {
    thumbnails: {
      default: {
        url: string,
      }
    }
  }

}