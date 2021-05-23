import { Component, OnInit, Input } from '@angular/core';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseappapp } from '../firebaseapp';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  // 223853152510803972
  members: Id[] = [];
  ids: Id[] = [
    {id: "423925286350880779", role: "code", name: null, avatarurl: null },
    {id: "334441700279975938", role: "code", name: null, avatarurl: null },
    {id: "223853152510803972", role: "desing", name: null, avatarurl: null },
  ];
  @Input() extraIds: Id[] | null | undefined;

  async ngOnInit(): Promise<void> {
    const db = getFirestore(firebaseappapp);
    if(this.extraIds) {
      for (const u of this.extraIds) {
        this.ids.push(u);
      }
    }
    

    for (const user of this.ids) {
      const d = doc(db, `dcusers/${user.id}`)
      getDoc(d).then((res: any) => {
        this.members.push({
          id: user.id,
          role: user.role,
          name: res.data()['tag'],
          avatarurl: res.data()['pp'] || null,
        });
      });
    }
  }

}

interface Id {
  id: string,
  role: 'code' | 'desing' | 'idea' | 'other',
  name: string | null | undefined,
  avatarurl: string | null | undefined,
}
