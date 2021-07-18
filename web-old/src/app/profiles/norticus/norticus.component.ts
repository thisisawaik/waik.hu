import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-norticus',
  templateUrl: './norticus.component.html',
  styleUrls: ['./norticus.component.scss'],
})
export class NorticusComponent implements OnInit {
  db = getFirestore();
  pp: string =
    'https://cdn.discordapp.com/avatars/118466559738904576/6b4610199259efab8493cafb3e049938.webp';
  name: string = 'Norticus36#7832';

  desc: string = `Sziasztok! Norticus (Todi) vagyok, főként számítógépes játékokkal és az informatikával foglalkozom. Néha talán túlságosan is versengő vagyok a mentális jólétemnek. Ha játékokról vagy animékről van szó, szívesen elbeszélgetek róluk. Jelenleg informatikushallgató vagyok, de igyekszem időt szánni magamra és a streamelésre is. A waik csapat egyik alapító tagja vagyok (fun fact, az eredeti waik figurához egyedül én nem rajzoltam hozzá, mire odaértem már véglegesítve lett), a szervereket amin a csapat játszik legtöbbször én hosztolom. Igyekszem élőben is közvetíteni a történéseket, ha új sorozat készül éppen, akkor én (és néha Isti) streameljük élőben, de szoktam egyedül is streamelni, akár angolul is.`;
  constructor(private htmltitle: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.htmltitle.setTitle('Waik | Norticus36')
    this.meta.addTag({ property: 'og:title', content: 'Waik | Norticus36' });
    this.meta.addTag({
      property: 'og:image',
      content: this.pp,
    });
    this.meta.addTag({
      property: 'og:description',
      content: this.desc,
    });
    this.meta.addTag({ property: 'theme-color', content: '#278003'})
    this.meta.addTag({ property: 'og:color', content: '#278003'})
    this.meta.addTag({ property: 'twitter:site', content: 'https://waik.hu/' });
    this.meta.addTag({
      property: 'twitter:creator',
      content: '@zal1000original',
    });
    this.meta.addTag({ property: 'twitter:image:alt', content: 'Waik' });
    this.meta.addTag({ property: 'fb:app_id', content: '581458672492860' });
    this.meta.addTag({ property: 'og:url', content: 'https://waik.hu/' });
    const tdrRef = doc(this.db, 'dcusers/118466559738904576');

    getDoc(tdrRef).then((res) => {
      this.pp = res.data()?.pp;
    });
  }
}