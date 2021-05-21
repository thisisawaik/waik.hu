import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  // 223853152510803972
  members: Id[] = [];
  ids: Id[] = [
    {id: "423925286350880779", role: "code", name: null, avatarurl: null },
    {id: "334441700279975938", role: "code", name: null, avatarurl: null },
    {id: "223853152510803972", role: "desing", name: null, avatarurl: null },
  ];
  @Input() extraIds: Id[] | null;

  async ngOnInit(): Promise<void> {
    if(this.extraIds) {
      for await (const u of this.extraIds) {
        this.ids.push(u);
      }
    }
    

    for await (const user of this.ids) {
      const ref = this.db.collection('dcusers').doc(user.id);
      const doc = await ref.get().toPromise();

      this.members.push({
        id: user.id,
        role: user.role,
        name: doc.data()['tag'],
        avatarurl: doc.data()['pp'] || null,
      });
    }

    console.log(this.members)
  }

}

interface Id {
  id: string,
  role: 'code' | 'desing' | 'idea' | 'other',
  name: string | null,
  avatarurl: string | null,
}
