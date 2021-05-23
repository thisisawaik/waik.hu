import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-badge',
  templateUrl: './social-badge.component.html',
  styleUrls: ['./social-badge.component.scss']
})
export class SocialBadgeComponent implements OnInit {

  constructor() { }

  @Input() socialType: SocialType | undefined;
  @Input() socialUser: string | undefined;

  ngOnInit(): void {
  }


  public get socialUrl() : string {

    switch (this.socialType) {
      case 'youtube': return `https://www.youtube.com/user/${this.socialUser}?utm_source=waik.hu`;
      case 'twitch': return `https://www.twitch.tv/${this.socialUser}?utm_source=waik.hu`;
      case 'twitter': return `https://twitter.com/${this.socialUser}?utm_source=waik.hu`;
      case 'github': return `https://github.com/${this.socialUser}?utm_source=waik.hu`;
      case 'facebook': return `https://facebook.com/${this.socialUser}?utm_source=waik.hu`;
      case 'instagram': return `https://instagram.com/${this.socialUser}?utm_source=waik.hu`;
      case 'reddit': return `https://www.reddit.com/${this.socialUser}/?utm_source=waik.hu`;
      case 'vimeo': return `https://vimeo.com/${ this.socialUser }?utm_source=waik.hu`;
      default: return'null';
    }
  }


  public get socialIcon() : string {
    switch (this.socialType) {
      case 'youtube': return `assets/svgs/yt_logo.svg`;
      case 'twitch': return `assets/svgs/twitch_logo.svg`;
      case 'twitter': return `assets/svgs/twitter_logo.svg`;
      case 'github': return `assets/svgs/github_logo.svg`;
      case 'facebook': return `assets/svgs/facebook_logo.svg`;
      case 'instagram': return `assets/svgs/instagram_logo.svg`;
      case 'reddit': return `assets/svgs/reddit_logo.svg`;
      case 'vimeo': return `assets/svgs/vimeo_logo.svg`;
      default: return'null';
    }
  }
}

type SocialType = 'youtube' | 'twitch' | 'twitter' | 'github' | 'facebook' | 'instagram' | 'reddit' | 'vimeo';
