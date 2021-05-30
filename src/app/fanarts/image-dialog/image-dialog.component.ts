import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { doc, getDoc, getFirestore } from '@firebase/firestore';
import { getDownloadURL, getStorage, ref } from '@firebase/storage';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {

  title: string = "Loading..."
  authorAvatar: string | null = null;
  imageurl: string |  null = null;
  authorName: string | null = null;
  db = getFirestore();
  storage = getStorage();


  constructor(public dialogRef: MatDialogRef<ImageDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData, private msg: MessagesService) { }

  ngOnInit(): void {
    console.log(this.data.id)
    const d = doc(this.db, `waik/website/fanarts/${this.data.id}`);
    getDoc(d).then(adoc => {
      console.log(adoc.data())
      if(adoc.data()?.title) this.title = adoc.data()?.title;
      if(adoc.data()?.downloadurl || adoc.data()?.gsurl) {
        if(adoc.data()?.getFromGS) {
          getDownloadURL(ref(this.storage, adoc.data()?.gsurl)).then(imgurl => {
            this.imageurl = imgurl;
            console.log(imgurl);
          }).catch(e => {
            console.warn(e);
          });
        } else {
          this.imageurl = adoc.data()?.downloadurl;
        }
      }
      if (adoc.data()?.author) {
        const userref = doc(this.db, `users/${adoc.data()?.author}`);
        getDoc(userref)
          .then((docdata: any) => {
            if (docdata.data()['dcid']) {
                getDoc(doc(this.db, `dcusers/${docdata.data()['dcid']}`))
                .then((doc: any) => {
                  this.authorAvatar = doc.data()['pp'];
                  this.authorName = doc.data()['tag'];
                })
                .catch((e: any) => this.msg.error(e.message));
            }
          })
          .catch((e) => this.msg.error(e.message));
      }
    });
  }
}

interface DialogData {
  id: string;
}