import { Component, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-geiszla',
  templateUrl: './geiszla.component.html',
  styleUrls: ['./geiszla.component.scss']
})
export class GeiszlaComponent implements OnInit {

  pp: string = "https://cdn.discordapp.com/avatars/175193667269558272/70f1d3545c7d38f4735148324c93f7ee.webp";
  name: string = "András";
  desc: string =  `
    Please add it ASAP  
  `;

  db = getFirestore();

  constructor() { }

  ngOnInit(): void {
    const tdrRef = doc(this.db, 'dcusers/175193667269558272');

    getDoc(tdrRef).then((res) => {
      this.pp = res.data()?.pp ? res.data()?.pp : this.pp;
      this.name = res.data()?.username ? res.data()?.username : this.name;
    });
  }

}
