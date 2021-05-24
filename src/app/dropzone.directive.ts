import { Directive, HostListener, Output, EventEmitter  } from '@angular/core';
import { MessagesService } from './services/messages.service';

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective {

  constructor(private msg: MessagesService) { }

  @Output() dropped =  new EventEmitter<FileList>();
  @Output() hovered =  new EventEmitter<boolean>();

  @HostListener('drop', ['$event'])
  onDrop($event: DragEvent) {
    $event.preventDefault();
    if($event.dataTransfer) {
      this.dropped.emit($event.dataTransfer.files);
    } else {
      this.msg.warn('Nincs adat.')
    }
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event: DragEvent) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event: DragEvent) {
    $event.preventDefault();
    this.hovered.emit(false);
  }

}
