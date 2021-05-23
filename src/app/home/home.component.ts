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
    this.meta.addTag({name: 'og:title', content:'Waik weboldal'})
    this.meta.addTag({name: 'og:image', content:'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/waik%2Fpublic%2Fwaik_cup.jpg?alt=media&token=5c3a6c28-644a-492a-ba4d-74d9e52470e2'})
    this.meta.addTag({name: 'og:description', content:'A hivatalos waik weboldal'})
    this.meta.addTag({name: 'twitter:site', content: 'https://waik.hu/'})
    this.meta.addTag({name: 'twitter:creator', content: '@zal1000original'})
    this.meta.addTag({name: 'twitter:image:alt', content: 'Waik'})
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
