import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(private storage: AngularFireStorage) { }

  title: string = null;
  dlurl: string | null = null;
  image: string | null = null;
  github: string | null = null;
  desc: string | null = null;

  ngOnInit(): void {

  }

}
