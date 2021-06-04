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
    const platforms : SocialFunc = {
      'youtube'  : (user) => `https://www.youtube.com/user/${user}`,
      'twitch'   : (user) => `https://www.twitch.tv/${user}`,
      'twitter'  : (user) => `https://twitter.com/${user}`,
      'github'   : (user) => `https://github.com/${user}`,
      'facebook' : (user) => `https://facebook.com/${user}`,
      'instagram': (user) => `https://instagram.com/${user}`,
      'reddit'   : (user) => `https://www.reddit.com/${user}`,
      'vimeo'    : (user) => `https://vimeo.com/${user}`,
    }

    if(this.socialUser) return `${platforms[this.socialType](this.socialUser)}?utm_source=waik.hu`;
    else return `/`;
  }

  public get socialIcon() : string {
    const platforms : SocialFunc = {
      'youtube'  : () => `yt_logo.svg`,
      'twitch'   : () => `twitch_logo.svg`,
      'twitter'  : () => `twitter_logo.svg`,
      'github'   : () => `github_logo.svg`,
      'facebook' : () => `facebook_logo.svg`,
      'instagram': () => `instagram_logo.svg`,
      'reddit'   : () => `reddit_logo.svg`,
      'vimeo'    : () => `vimeo_logo.svg`,
    }

    if(this.socialUser) return `assets/svgs/${platforms[this.socialType](this.socialUser)}`
    else return `assets/svgs/no-found-icon.svg`;
  }
}

type SocialType = 'youtube' | 'twitch' | 'twitter' | 'github' | 'facebook' | 'instagram' | 'reddit' | 'vimeo';

type SocialFunc = {
  [name in SocialType]:  (user?: string) => string;
};
