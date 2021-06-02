import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm, FormBuilder, FormGroup  } from '@angular/forms';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  requiredControl = new FormControl('Initial value', [Validators.required]);

  name: string = '';

  myForm!: FormGroup; 

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: '',
      message: ''
    })
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

}
