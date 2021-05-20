import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  pedroClickCounter = 0;
  isOpen = true;


  constructor() { }

  ngOnInit(): void {
    console.log('home loaded')
  }

  pedroClick() {
    let audio = new Audio();
    audio.src = "assets/YEET.mp3";
    audio.volume = 0.07;
    audio.load();
    audio.play();
    this.pedroClickCounter = this.pedroClickCounter + 1;
    console.log(this.pedroClickCounter)
    if(this.pedroClickCounter == 10) {
      console.log('10')
    }
    this.isOpen = !this.isOpen;
  }

}
