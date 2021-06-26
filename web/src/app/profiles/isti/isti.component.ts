import { Component, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-isti',
  templateUrl: './isti.component.html',
  styleUrls: ['./isti.component.scss']
})
export class IstiComponent implements OnInit {
  name: string = "Isti115"
  pp: string = "https://cdn.discordapp.com/avatars/174980450543075330/68bd161e38aaaff31a57ed05bf4ea971.webp";

  db = getFirestore();

  constructor() { }

  ngOnInit(): void {
    const tdrRef = doc(this.db, 'dcusers/174980450543075330');

    getDoc(tdrRef).then(res => {
      this.pp = res.data()?.pp ? res.data()?.pp : this.pp;
      this.name = res.data()?.username ? res.data()?.username : this.name;
    })
  }

}
