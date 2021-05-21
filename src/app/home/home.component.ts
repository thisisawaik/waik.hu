import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pedroClickCounter = 0;
  isOpen = true;

  constructor(private htmltitle: Title) {}

  ngOnInit(): void {
    this.htmltitle.setTitle('Főoldal')
  }

  pedroClick() {
    let audio = new Audio();
    audio.src = 'assets/YEET.mp3';
    audio.volume = 0.07;
    audio.load();
    audio.play();
    this.pedroClickCounter = this.pedroClickCounter + 1;
    console.log(this.pedroClickCounter);
    if (this.pedroClickCounter == 10) {
      console.log('10');
    }
    this.isOpen = !this.isOpen;
  }
}
