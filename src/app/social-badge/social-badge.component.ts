import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-badge',
  templateUrl: './social-badge.component.html',
  styleUrls: ['./social-badge.component.scss']
})
export class SocialBadgeComponent implements OnInit {

  constructor() { }

  @Input() socialType!: SocialType;
  @Input() socialUser!: string;

  ngOnInit(): void {
  }


  public get socialUrl() : string {
    const platforms = {
      'youtube'  : (user: string) => `https://www.youtube.com/user/${user}`,
      'twitch'   : (user: string) => `https://www.twitch.tv/${user}`,
      'twitter'  : (user: string) => `https://twitter.com/${user}`,
      'github'   : (user: string) => `https://github.com/${user}`,
      'facebook' : (user: string) => `https://facebook.com/${user}`,
      'instagram': (user: string) => `https://instagram.com/${user}`,
      'reddit'   : (user: string) => `https://www.reddit.com/${user}`,
      'vimeo'    : (user: string) => `https://vimeo.com/${user}`,
    }

    return `${platforms[this.socialType](this.socialUser)}?utm_source=waik.hu`
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
