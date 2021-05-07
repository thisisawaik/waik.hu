import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-walrusz',
  templateUrl: './walrusz.component.html',
  styleUrls: ['./walrusz.component.scss'],
})
export class WalruszComponent implements OnInit {
  latestvideo: any;
  videoURLs: SafeResourceUrl[] = [];
  videos: Array<Video> | any = [];
  getError: boolean;
  currentVideoIndex: number = 0;
  loading = true;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private db: AngularFirestore
  ) {}

  async ngOnInit(): Promise<void> {
    const videosquery = this.db.collection('waik').doc('videos').collection('post', ref => ref.where('channel', '==', 'Walrusz').orderBy('timestamp').limitToLast(3));
    this.loading = true;
    videosquery.get().subscribe(async coll => {
      let counter = 0;
      for await (const doc of coll.docs) {
        console.log(doc.data())
        const url: string = doc.data()?.url;
        this.videoURLs.push(this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${url.split('=')[1]}`
        ));
        this.videos.push({
          channel: doc.data()?.channel,
          thumbnails: {
            default: doc.data()?.thumbnails.default,
          },
          timestamp: doc.data()?.timestamp,
          url: doc.data()?.url,
          index: counter,
        })
        counter =+ 1;
        console.log(counter);
      }
      counter = 0

      console.log(this.videos);
      this.videoURLs.reverse();
      this.videos.reverse();
      this.loading = false;

    });
    /*
    this.http
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC9THn_bIenAFAMhqkZ-V9Aw&maxResults=3&order=date&type=video&key=${environment.firebaseConfig.apiKey}`
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
      */
  }

  // GET https://www.googleapis.com/youtube/v3/search?part=snippet&channelId={CHANNEL_ID}&maxResults=10&order=date&type=video&key={YOUR_API_KEY}
}

interface Video {
  url: string;
  thumbnails: {
    default: string;
  }
}
