import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tdrImage: string;
  istiImage: string;
  walruszImage: string;

  constructor(
    private db: AngularFirestore,
  ) { }

  ngOnInit(): void {
    const tdrRef = this.db.collection('dcusers').doc('118466559738904576');
    const istiRef = this.db.collection('dcusers').doc('174980450543075330');
    const walruszRef = this.db.collection('dcusers').doc('183302720030113792');
    tdrRef.get().toPromise().then((doc: any) => this.tdrImage = doc.data().pp)
    istiRef.get().toPromise().then((doc2: any) => this.istiImage = doc2.data().pp)
    walruszRef.get().toPromise().then((doc3: any) => this.walruszImage = doc3.data().pp)

    setTimeout(() => {
      console.log(this.tdrImage)
      console.log(this.istiImage)
      console.log(this.walruszImage)
    }, 1000);
  }

}
