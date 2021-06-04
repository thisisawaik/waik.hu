import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm, FormBuilder, FormGroup  } from '@angular/forms';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from '@firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { MessagesService } from 'src/app/services/messages.service';
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
  storage = getStorage();

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
  file: Event | undefined;
  isForCompatition = false;
  voted = false;
  votes: number = 0;
  savestate: 'loading' | 'synced' | 'modified' | 'error' = 'loading';
  docid: string | null = null;

  constructor(private fb: FormBuilder, private msg: MessagesService) { }

  async ngOnInit(): Promise<void> {
    this.myForm = this.fb.group({
      title: '',
      desc: '',
      image: '',
      isForCompatition: false,
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

        const c = collection(this.db, '/waik/website/fanarts');
        const q = query(c, where('author', '==', user.uid), where('status', '==', 'DRAFT'))
        getDocs(q).then(async docs => {
          if(docs.empty) {
            setDoc(doc(this.db, `/waik/website/fanart/${user.uid}`), {
              title: null,
              desc: null,
              gsURL: null,
              author: user.uid,
              status: 'DRAFT',
            }).then(val => {
              this.docid = user.uid;

              this.savestate = "synced";
            })
          } else {
            const artdoc = docs.docs[0];
            this.title = artdoc.data()?.title;
            this.desc = artdoc.data()?.desc;
            this.isForCompatition = artdoc.data()?.forComp || false;
            this.imageurl = artdoc.data()?.gsURL ? await getDownloadURL(ref(this.storage, artdoc.data()?.gsURL)) : null;

            this.savestate = "synced";
          }
        })
      }
    })

    
    
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    console.log(this.file?.target);
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

  voteAdd() {
    this.votes = 1;
    this.voted = true;
  }

  voteRemove() {
    this.votes = 0;
    this.voted = false;
  }

  onFileSelected(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0]
       console.log(file);
       if(file.type === "image/jpeg" || file.type === "image/png") {
        const user = this.auth.currentUser;
        const r = ref(this.storage, `/waik/fanarts/temp/${user?.uid}/${file.name}`)
        uploadBytes(r, file).then(async val => {
          this.imageurl = await getDownloadURL(ref(this.storage, val.ref.fullPath));
          this.msg.info('Kép sikeresen feltöltve!')
          updateDoc(doc(this.db, `/waik/website/fanarts/${this.docid}`), {
            gsURL: `/waik/fanarts/temp/${user?.uid}/${file.name}`,
          });
        }).catch(e => {
          if(e.code === "storage/unauthorized") {
            this.msg.error(`Sikertelen feltöltés! Hiányzó jogosultságok!`);
          }
        });
       } else if(file.type === "image/svg" || file.type === "image/svg+xml") {
        this.msg.warn('Javasolt JPG vagy PNG formátumot használni!');
        const r = ref(this.storage, `test/${file.name}`)
        uploadBytes(r, file).then(async val => {
          this.imageurl = await getDownloadURL(ref(this.storage, val.ref.fullPath));
        }).catch(e => {
          if(e.code === "storage/unauthorized") {
            this.msg.error(`Sikertelen feltöltés! Hiányzó jogosultságok!`);
          }
        });
       } else {
        this.msg.error('Csak képet lehet feltölteni!');
       }
       
     }
   }
}