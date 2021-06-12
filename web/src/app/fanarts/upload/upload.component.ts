import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  NgForm,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from '@firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { MessagesService } from 'src/app/services/messages.service';
import { getFunctions, httpsCallable } from 'firebase/functions'
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  requiredControl = new FormControl('Initial value', [Validators.required]);

  name: string = '';

  myForm!: FormGroup;

  auth = getAuth();
  db = getFirestore();
  storage = getStorage();
  functions = getFunctions();

  title: string | null = null;
  authorAvatar: string | null = null;
  sharetext = 'Megosztás';
  shareclass = 'red';
  shareable = true;
  likes: string[] = [];
  liked = false;
  authorName = 'Ez le lesz cserélve a discord nevedre';
  imageurl: string | null = null;
  desc: string | null = null;
  file: Event | undefined;
  isForCompatition = false;
  voted = false;
  votes: number = 0;
  savestate: 'loading' | 'synced' | 'modified' | 'error' = 'loading';
  docid: string | null = null;

  maxTitle: number = 30;
  maxDesc: number = 500;

  saveBtnClass: 'green' | 'yellow' | 'red' = 'green';
  saveBtnContent: string = "Mentés";

  uploadInProgress: boolean = true;
  uploadPrecentage: number = 0;

  comp_categorys: FanartCategory[] = [];

  constructor(private fb: FormBuilder, private msg: MessagesService, public dialog: MatDialog,) {}

  async ngOnInit(): Promise<void> {
    this.myForm = this.fb.group({
      title: '',
      desc: '',
      image: '',
      isForCompatition: false,
    });

    const d = doc(this.db, 'waik/website');

    getDoc(d)
      .then((asd) => {
        const config = asd.data()?.fanart_config;
        this.maxDesc = config.maxDesc;
        this.maxTitle = config.maxTitle;
        this.comp_categorys = config.comp.categorys
      })
      .catch((e) => {
        console.error(e.code);
        this.msg.error(`Hiba! ${e.message}`);
      });

    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.authorAvatar = user?.photoURL || null;
        try {
          const d = await getDoc(doc(this.db, `users/${user.uid}`));
          if (d.data()?.dcid) {
            const dcd = await getDoc(doc(this.db, `dcusers/${d.data()?.dcid}`));
            if (dcd.data()?.pp) {
              this.authorAvatar = dcd.data()?.pp || user?.photoURL || null;
              this.authorName =
                dcd.data()?.tag || 'Ez le lesz cserélve a discord nevedre';
            }
          }
        } catch (e) {
          this.msg.error('Hiba!');
          console.error(e);
        }

        const c = collection(this.db, '/waik/website/fanarts');
        const q = query(
          c,
          where('author', '==', user.uid),
          where('status', '==', 'DRAFT')
        );

        getDocs(q)
          .then(async (docs) => {
            if (docs.empty) {
              setDoc(doc(this.db, `/waik/website/fanarts/${user.uid}`), {
                title: null,
                desc: null,
                gsURL: null,
                author: user.uid,
                status: 'DRAFT',
                forComp: this.isForCompatition,
              }).then((val) => {
                this.docid = user.uid;

                this.savestate = 'synced';
              }).catch(e => {
                this.msg.error(`Hiba! ${e.message}`)
              });
            } else {
              const artdoc = docs.docs[0];
              this.title = artdoc.data()?.title;
              this.desc = artdoc.data()?.desc;
              this.isForCompatition = artdoc.data()?.forComp || false;
              this.imageurl = artdoc.data()?.gsURL
                ? await getDownloadURL(ref(this.storage, artdoc.data()?.gsURL))
                : null;

              this.savestate = 'synced';
            }
          })
          .catch((e) => {
            this.msg.error(`Hiba! ${e.message}`);
            console.error(e);
          });
      }
    });
  }

  onSubmit(f: NgForm) {
    console.log(f.value); // { first: '', last: '' }
    console.log(f.valid); // false
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
    if (user) {
      this.liked = true;
      this.likes = [user.uid];
    }
  }

  dislike() {
    const user = this.auth.currentUser;
    if (user) {
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
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const user = this.auth.currentUser;
        const r = ref(
          this.storage,
          `/waik/fanarts/temp/${user?.uid}/${file.name}`
        );
        uploadBytesResumable(r, file)
          .on('state_changed', async (snap) => {
            this.uploadPrecentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            this.uploadInProgress = true;

            if(snap.bytesTransferred / snap.totalBytes === 100) {
              this.imageurl = await getDownloadURL(
                ref(this.storage, snap.ref.fullPath)
              ); 
              this.msg.info('Kép sikeresen feltöltve!');
              updateDoc(doc(this.db, `/waik/website/fanarts/${this.docid}`), {
                gsURL: `/waik/fanarts/temp/${user?.uid}/${file.name}`,
              });
            }
          },
          (e) => {
            if (e.code === 'storage/unauthorized') {
              this.msg.error(`Sikertelen feltöltés! Hiányzó jogosultságok!`);
            }
          },
          async () => {
            this.imageurl = await getDownloadURL(
              ref(this.storage, `/waik/fanarts/temp/${user?.uid}/${file.name}`)
            );
            this.msg.info('Kép sikeresen feltöltve!');
            updateDoc(doc(this.db, `/waik/website/fanarts/${user?.uid}`), {
              gsURL: `/waik/fanarts/temp/${user?.uid}/${file.name}`,
            }).catch(e => {
              this.msg.error(e.message);
            });
            this.uploadPrecentage = 100;

          })
          /*
          .then(async (val) => {

          })
          .catch((e) => {
            if (e.code === 'storage/unauthorized') {
              this.msg.error(`Sikertelen feltöltés! Hiányzó jogosultságok!`);
            }
          });
          */
        
      } else if (file.type === 'image/svg' || file.type === 'image/svg+xml') {
        this.msg.warn('Javasolt JPG vagy PNG formátumot használni!');
        const r = ref(this.storage, `test/${file.name}`);
        uploadBytes(r, file)
          .then(async (val) => {
            this.imageurl = await getDownloadURL(
              ref(this.storage, val.ref.fullPath)
            );
          })
          .catch((e) => {
            if (e.code === 'storage/unauthorized') {
              this.msg.error(`Sikertelen feltöltés! Hiányzó jogosultságok!`);
            }
          });
      } else {
        this.msg.error('Csak képet lehet feltölteni!');
      }
    }
  }

  saveAsDraft() {
    const user = this.auth.currentUser;
    if(user) {
      this.saveBtnClass = 'yellow';
      this.saveBtnContent = 'Mentés...'
      setDoc(doc(this.db, `/waik/website/fanarts/${user.uid}`), {
        title: this.title || null,
        desc: this.desc || null,
        status: 'DRAFT',
        forComp: this.isForCompatition || false,
      }, {merge: true}).then(res => {
        this.saveBtnClass = 'green';
        this.saveBtnContent = 'Sikeres mentés!'
        setTimeout(() => {
          this.saveBtnContent = 'Mentés'
        }, 3000);
      })
    } else {

    }
  }

  submit() {
    const dialogRef = this.dialog.open(UploadSubmitPromptDialog);
    const user = this.auth.currentUser;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result === true) {

        httpsCallable(this.functions, 'waikFanartSubmit')({postId: user?.uid}).then(res => {
          console.log(res)
        }).catch(e => {
          console.error(e);
        })
        /*
        updateDoc(doc(this.db, `/waik/website/fanarts/${user!.uid}`), {
          status: 'QUEUE',
        }).then(res => {
          this.msg.success('Sikeres beküldés! Publikálás az ellenőrzés után fog megtörténni amiről eMail-ben fogunk értesíteni!', 20000);
        }).catch(e => {
          this.msg.error(`Hiba beküldés közben! ${e.message}`);
          console.error(e);
        })
        */
      } else {
        this.msg.warn('Beküldés megszakítva!');
      }
    });
  }
}

@Component({
  selector: 'upload-submit-prompt-dialog',
  templateUrl: './submit-dialog.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadSubmitPromptDialog {}

interface FanartCategory {
  name: string,
  value: string,
}