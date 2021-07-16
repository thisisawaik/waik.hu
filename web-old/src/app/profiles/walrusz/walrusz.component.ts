import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  collection,
  getDocs,
  getFirestore,
  limitToLast,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-walrusz',
  templateUrl: './walrusz.component.html',
  styleUrls: ['./walrusz.component.scss'],
})
export class WalruszComponent implements OnInit {
  latestvideo: any;
  videoURLs: SafeResourceUrl[] = [];
  videos: Array<Video> | any = [];
  getError: boolean | undefined;
  currentVideoIndex: number = 0;
  loading = true;
  pp: string = "https://yt3.ggpht.com/ytc/AAUvwniseLALwR5fmrqhrt2YDGgh1VJSCviENV2MkukhUg=s68-c-k-c0x00ffffff-no-rj";

  desc: string = `Üdvözöllek! Walrusz vagyok és úgy hiszem, bármiről lehet érdekes, kreatív és szórakoztató videót készíteni, hogyha az ember elegendő munkát fektet bele. Mesterségem elsősorban a szórakoztató ismeretterjesztő tartalmak gyártása, de emellett sok más mindent is találhatsz a csatornámon. Szeretek nagy hangsúlyt fektetni a videók vágására, az utómunkára és hiszek abban, hogy a minőségi szórakoztatás kulcsa a kreativitásban rejlik. Bátran nézz szét a csatornámon, háthatalálsz valamit, ami tetszik :)`

  db = getFirestore();

  constructor(private sanitizer: DomSanitizer, private htmltitle: Title, private meta: Meta) {}

  async ngOnInit(): Promise<void> {

    this.htmltitle.setTitle('Waik | Walrusz')
    this.meta.addTag({ property: 'og:title', content: 'Waik | Walrusz' });
    this.meta.addTag({
      property: 'og:image',
      content: this.pp,
    });
    this.meta.addTag({
      property: 'og:description',
      content: this.desc,
    });
    this.meta.addTag({ property: 'theme-color', content: '#7f5b26'})
    this.meta.addTag({ property: 'og:color', content: '#7f5b26'})
    this.meta.addTag({ property: 'twitter:site', content: 'https://waik.hu/' });
    this.meta.addTag({
      property: 'twitter:creator',
      content: '@zal1000original',
    });
    this.meta.addTag({ property: 'twitter:image:alt', content: 'Waik' });
    this.meta.addTag({ property: 'fb:app_id', content: '581458672492860' });
    this.meta.addTag({ property: 'og:url', content: 'https://waik.hu/' });

    const q = query(
      collection(this.db, 'waik/videos/post'),
      where('channel', '==', 'Walrusz'),
      orderBy('timestamp'),
      limitToLast(3)
    );
    getDocs(q).then((coll: any) => {
      let counter = -1;
      for (const doc of coll.docs) {
        console.log(doc.data());
        const url: string = doc.data()?.url;
        this.videoURLs.push(
          this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${url.split('=')[1]}`
          )
        );
        this.videos.push({
          channel: doc.data()?.channel,
          thumbnails: {
            default: doc.data()?.thumbnails.default,
          },
          timestamp: doc.data()?.timestamp,
          url: doc.data()?.url,
          index: (counter = +1),
        });
        counter = counter + 1;

        let a: any[] = [];

        a.indexOf((e: string) => e === '');

        console.log(counter);
      }

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

  changeindex(url: string) {
    console.log(url);
    console.log(this.videos.indexOf((e: { url: string }) => e.url === url));
    this.currentVideoIndex = this.videos.indexOf(
      (e: { url: string }) => e.url == url
    );
  }

  detectMob(): boolean {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
  }

  // GET https://www.googleapis.com/youtube/v3/search?part=snippet&channelId={CHANNEL_ID}&maxResults=10&order=date&type=video&key={YOUR_API_KEY}
}

interface Video {
  url: string;
  thumbnails: {
    default: string;
  };
}
