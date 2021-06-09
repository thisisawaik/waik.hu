import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discord-news',
  templateUrl: './discord-news.component.html',
  styleUrls: ['./discord-news.component.scss']
})
export class DiscordNewsComponent implements OnInit {

  messages: Messages[] = [
    { content: 'gkjadgjadlkfg', author: 'https://cdn.discordapp.com/avatars/118466559738904576/6b4610199259efab8493cafb3e049938.webp' },
    { content: 'gkmaséf', author: 'https://cdn.discordapp.com/avatars/118466559738904576/6b4610199259efab8493cafb3e049938.webp' },
    { content: 'félkawáf', author: 'https://cdn.discordapp.com/avatars/118466559738904576/6b4610199259efab8493cafb3e049938.webp' },
    { content: 'gopeafgmealéjk', author: 'https://cdn.discordapp.com/avatars/118466559738904576/6b4610199259efab8493cafb3e049938.webp' },
    { content: 'eamlkvfeajfk', author: 'https://cdn.discordapp.com/avatars/118466559738904576/6b4610199259efab8493cafb3e049938.webp' },
    
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

interface Messages {
  content: string,
  author: string,
}