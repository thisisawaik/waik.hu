import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-discord-embed',
  templateUrl: './discord-embed.component.html',
  styleUrls: ['./discord-embed.component.scss']
})
export class DiscordEmbedComponent implements OnInit {
  membercount: string = "Loading..."
  channels: any[] | null = null;
  invite: string | null = null;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get("https://discord.com/api/guilds/541446521313296385/widget.json").toPromise().then((res: any) => {
      this.membercount = res.presence_count;
      this.channels = res.channels;
      this.invite = res.instant_invite;
      //console.log(res);
    }).catch(e => {
      console.error(e)
      //this.msg.error(e.message);
      this.membercount = "Error";
    })
  }

  join() {
    // https://discord.com/invite/mSqPEAkJ?utm_source=Discord%20Widget&utm_medium=Connect
    if(this.invite) {
      const url = `${this.invite.split('?')[0]}?utm_source=waik.hu&utm_medium=join_button` || 'https://discord.com/invite/RA8uasa?utm_source=waik.hu&utm_medium=join_button';
      //this.msg.info(`Árirányítás... (${url.split('?')[0]})`);
      setTimeout(() => {
        open(url)
      }, 3000);
    }
    
  }

}
