import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  isHovering: boolean = false;

  files: File[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  toggleHover(event: any) {
    console.log( typeof event );
    console.log(event);
    this.isHovering = event;
  }

  onDrop(file: any) {
    console.log(typeof file);
    for (let index = 0; index < file.length; index++) {
      
    }
  }

}
