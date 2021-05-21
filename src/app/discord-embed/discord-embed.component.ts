import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discord-embed',
  templateUrl: './discord-embed.component.html',
  styleUrls: ['./discord-embed.component.scss']
})
export class DiscordEmbedComponent implements OnInit {

  membercount: string = "Loading..."
  channels: any[] | null = null;
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get("https://discord.com/api/guilds/541446521313296385/widget.json").toPromise().then((res: any) => {
      this.membercount = res.presence_count;
      this.channels = res.channels;
    }).catch(e => {
      console.error(e)
      this.membercount = "Error";
    })
  }

  join() {
    // https://discord.com/invite/mSqPEAkJ?utm_source=Discord%20Widget&utm_medium=Connect
    open('https://discord.com/invite/mSqPEAkJ?utm_source=waik.hu&utm_medium=join_button')
  }

}
