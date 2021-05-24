import { Component, Input, OnInit, Pipe } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {  finalize, tap  } from 'rxjs/operators'

@Component({
  selector: 'app-uploader-task',
  templateUrl: './uploader-task.component.html',
  styleUrls: ['./uploader-task.component.scss']
})
export class UploaderTaskComponent implements OnInit {

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { }

  @Input()
  file!: File;

  task: AngularFireUploadTask | undefined;

  precentage!: Observable<number | undefined>;
  snapshot!: Observable<any>;
  
  ngOnInit(): void {
  }

  startUpload() {
    this.db.collection('waik').doc('website').collection('fanart').add({
      author: 'USER',
      status: 'PREPAREING',
      gsurl: null,
      downloadurl: null,
      getFromGS: true,
      public: false,
    }).then(res => {
      const path = `waik/fan/art/USER/${res.id}.${this.file.type}`;
      const ref = this.storage.ref(path);

      this.task = this.storage.upload(path, this.file);

      this.precentage = this.task.percentageChanges();

      this.snapshot = this.task.snapshotChanges().pipe(
        tap(console.log),

        finalize( async() => {

          const downloadurl = await ref.getDownloadURL().toPromise();
         
          res.update({
            downloadurl: downloadurl,
            gsurl: `gs://zal1000.net/${path}`,
            status: 'UPLADED'
          })
        })
      );
    })
  }

  isActive(snapshot: any) {
    return snapshot.state === 'running' && snapshot.bytesTransfered < snapshot.totalBytes;
  }

}
