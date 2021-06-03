import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm, FormBuilder, FormGroup  } from '@angular/forms';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { doc, getDoc, getFirestore } from '@firebase/firestore';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  requiredControl = new FormControl('Initial value', [Validators.required]);

  name: string = '';

  myForm!: FormGroup; 

  auth = getAuth();
  db = getFirestore();

  title: string | null = null;
  authorAvatar: string | null = null;
  sharetext = "Megosztás";
  shareclass = "red";
  shareable = true;
  likes: string[] = [];
  liked = false;
  authorName = "Ez le lesz cserélve a discord nevedre";
  imageurl: string | null = null;
  desc: string | null = null;
  file: any;

  constructor(private fb: FormBuilder,) { }

  async ngOnInit(): Promise<void> {
    this.myForm = this.fb.group({
      title: '',
      desc: '',
      image: '',
    })
    
    onAuthStateChanged(this.auth, async (user) => {
      if(user) {
        console.log(user)
        this.authorAvatar = user?.photoURL || null;
        const d = await getDoc(doc(this.db, `users/${user.uid}`));

        if(d.data()?.dcid) {
          const dcd = await getDoc(doc(this.db, `dcusers/${d.data()?.dcid}`))
          if(dcd.data()?.pp) {
            this.authorAvatar = dcd.data()?.pp || user?.photoURL || null;
            this.authorName = dcd.data()?.tag || "Ez le lesz cserélve a discord nevedre";
          }
        }
      }
    })

    
    
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

  share() {
    this.shareclass = 'green';
    this.sharetext = 'Link a vágólapon';

    setTimeout(() => {
      this.shareclass = 'red';
      this.sharetext = 'Megosztás';
    }, 5000);
  }

  like() {
    const user = this.auth.currentUser;
    if(user) {
      this.liked = true;
      this.likes = [user.uid];
    }
  }

  dislike() {
    const user = this.auth.currentUser;
    if(user) {
      this.liked = false;
      this.likes = [];
    }
  }

}
