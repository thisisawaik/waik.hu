import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ImagesComponent } from './images.component';

describe('ImagesComponent', () => {
  let component: ImagesComponent;
  let fixture: ComponentFixture<ImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesComponent ],
      imports: [ MatDialogModule, MatSnackBarModule, HttpClientModule, MatDialogRef ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
