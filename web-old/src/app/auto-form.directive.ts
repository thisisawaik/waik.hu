import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  doc,
  documentId,
  DocumentReference,
  getFirestore,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { tap, map, take, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appAutoForm]',
})
export class AutoFormDirective {
  @Input()
  path: string = 'test';
  @Input()
  formGroup!: FormGroup;

  private _state!: 'loading' | 'synced' | 'modified' | 'error';

  @Output() stateChange = new EventEmitter<string>();
  @Output() formError = new EventEmitter<string>();

  private docRef!: DocumentReference;

  private formSub!: Subscription;

  db = getFirestore();

  constructor() {}

  ngOnInit() {
    this.preloadData();
    this.autoSave();
  }

  // Loads initial form data from Firestore
  async preloadData() {
    this.state = 'loading';
    this.docRef = await this.getDocRef(this.path);
    onSnapshot(this.docRef, (doc) => {
      if (doc) {
        this.formGroup.patchValue(doc);
        this.formGroup.markAsPristine();
        this.state = 'synced';
      }
    });
  }

  // Autosaves form changes
  autoSave() {
    this.formSub = this.formGroup.valueChanges
      .pipe(
        tap((change) => {
          this.state = 'modified';
        }),
        debounceTime(2000),
        tap((change) => {
          if (this.formGroup.valid && this._state === 'modified') {
            this.setDoc();
          }
        })
      )
      .subscribe();
  }

  // Intercept form submissions to perform the document write
  @HostListener('ngSubmit', ['$event'])
  onSubmit(e: Event) {
    this.setDoc();
  }

  // Determines if path is a collection or document
  async getDocRef(path: string): Promise<DocumentReference> {
    if (path.split('/').length % 2) {
      return doc(this.db, `${path}/${documentId()}`);
    } else {
      return doc(this.db, path);
    }
  }

  // Writes changes to Firestore
  async setDoc() {
    try {
      await setDoc(this.docRef, (this.formGroup.value, { merge: true }));
      this.state = 'synced';
    } catch (err) {
      console.log(err);
      this.formError.emit(err.message);
      this.state = 'error';
    }
  }

  // Setter for state changes
  set state(val: 'loading' | 'synced' | 'modified' | 'error') {
    this._state = val;
    this.stateChange.emit(val);
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
  }
}
