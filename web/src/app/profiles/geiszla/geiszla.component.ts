import { Component, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-geiszla',
  templateUrl: './geiszla.component.html',
  styleUrls: ['./geiszla.component.scss']
})
export class GeiszlaComponent implements OnInit {

  pp: string = "https://cdn.discordapp.com/avatars/175193667269558272/70f1d3545c7d38f4735148324c93f7ee.webp";
  name: string = "Geiszla";
  desc: string =  `
    Please add it ASAP  
  `;

  db = getFirestore();

  constructor(private htmltitle: Title, private meta: Meta) { }

  ngOnInit(): void {

    this.htmltitle.setTitle(`Waik | ${this.name}`)
    this.meta.addTag({ property: 'og:title', content: `Waik | ${this.name}` });
    this.meta.addTag({
      property: 'og:image',
      content: this.pp,
    });
    this.meta.addTag({
      property: 'og:description',
      content: this.desc,
    });
    this.meta.addTag({ property: 'theme-color', content: '#2764e9'})
    this.meta.addTag({ property: 'og:color', content: '#2764e9'})
    this.meta.addTag({ property: 'twitter:site', content: 'https://waik.hu/' });
    this.meta.addTag({
      property: 'twitter:creator',
      content: '@zal1000original',
    });
    this.meta.addTag({ property: 'twitter:image:alt', content: 'Waik' });
    this.meta.addTag({ property: 'fb:app_id', content: '581458672492860' });
    this.meta.addTag({ property: 'og:url', content: 'https://waik.hu/' });

    const tdrRef = doc(this.db, 'dcusers/175193667269558272');

    getDoc(tdrRef).then((res) => {
      this.pp = res.data()?.pp ? res.data()?.pp : this.pp;
      this.name = res.data()?.username ? res.data()?.username : this.name;
    });
  }

}
