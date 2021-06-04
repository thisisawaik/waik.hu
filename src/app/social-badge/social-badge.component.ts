import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-badge',
  templateUrl: './social-badge.component.html',
  styleUrls: ['./social-badge.component.scss']
})
export class SocialBadgeComponent implements OnInit {

  constructor() { }

  @Input() socialType!: SocialType;
  @Input() socialUser: string | undefined;

  ngOnInit(): void {
  }


  public get socialUrl() : string {
    const user = this.socialUser;
    const platforms = {
      'youtube'  : (user: any) => `https://www.youtube.com/user/${user}`,
      'twitch'   : (user: any) => `https://www.twitch.tv/${user}`,
      'twitter'  : (user: any) => `https://twitter.com/${user}`,
      'github'   : (user: any) => `https://github.com/${user}`,
      'facebook' : (user: any) => `https://facebook.com/${user}`,
      'instagram': (user: any) => `https://instagram.com/${user}`,
      'reddit'   : (user: any) => `https://www.reddit.com/${user}`,
      'vimeo'    : (user: any) => `https://vimeo.com/${user}`,
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
