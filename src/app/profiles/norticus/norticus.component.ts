import { Component, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-norticus',
  templateUrl: './norticus.component.html',
  styleUrls: ['./norticus.component.scss']
})
export class NorticusComponent implements OnInit {
  db = getFirestore();
  pp: string = "https://cdn.discordapp.com/avatars/118466559738904576/6b4610199259efab8493cafb3e049938.webp";
  constructor() { }

  ngOnInit(): void {

    const tdrRef = doc(this.db, 'dcusers/118466559738904576');

    getDoc(tdrRef).then(res => {
      this.pp = res.data()?.pp
    })
  }

}
