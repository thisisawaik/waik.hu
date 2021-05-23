import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pedroClickCounter = 0;
  isOpen = true;

  constructor(private htmltitle: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.htmltitle.setTitle('Főoldal')
    this.meta.addTag({tag: 'og:title', content:'waik.hu'})
    this.meta.addTag({tag: 'og:image', content:'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/waik%2Fpublic%2Fwaik_cup.jpg?alt=media&token=5c3a6c28-644a-492a-ba4d-74d9e52470e2'})
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
