import { Component, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-isti',
  templateUrl: './isti.component.html',
  styleUrls: ['./isti.component.scss'],
})
export class IstiComponent implements OnInit {
  name: string = 'Isti115';
  pp: string =
    'https://cdn.discordapp.com/avatars/174980450543075330/68bd161e38aaaff31a57ed05bf4ea971.webp';

  desc: string = `Sziasztok! :) Isti115 vagyok, a WAIK csapat tagja, jelenleg PhD hallgató az ELTE Informatikai Karán. Nagyon szeretek megérteni és elmagyarázni dolgokat, úgyhogy nyugodtan kérdezzetek, igyekszem minél jobban válaszolni! ;)`;
  db = getFirestore();

  constructor(private htmltitle: Title, private meta: Meta) {}

  ngOnInit(): void {

    this.htmltitle.setTitle('Waik | Isti115')
    this.meta.addTag({ property: 'og:title', content: 'Waik | Isti115' });
    this.meta.addTag({
      property: 'og:image',
      content: this.pp,
    });
    this.meta.addTag({
      property: 'og:description',
      content: this.desc,
    });
    this.meta.addTag({ property: 'theme-color', content: '#a1f0f5'})
    this.meta.addTag({ property: 'og:color', content: '#a1f0f5'})
    this.meta.addTag({ property: 'twitter:site', content: 'https://waik.hu/' });
    this.meta.addTag({
      property: 'twitter:creator',
      content: '@zal1000original',
    });
    this.meta.addTag({ property: 'twitter:image:alt', content: 'Waik' });
    this.meta.addTag({ property: 'fb:app_id', content: '581458672492860' });
    this.meta.addTag({ property: 'og:url', content: 'https://waik.hu/' });

    const tdrRef = doc(this.db, 'dcusers/174980450543075330');

    getDoc(tdrRef).then((res) => {
      this.pp = res.data()?.pp ? res.data()?.pp : this.pp;
      this.name = res.data()?.username ? res.data()?.username : this.name;
    });
  }
}
