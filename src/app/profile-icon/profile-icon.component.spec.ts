import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { getApps, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
import { ProfileIconComponent } from './profile-icon.component';

if(firebase.apps.length === 0) {
  firebase.initializeApp(environment.firebaseConfig);

}


describe('ProfileIconComponent', () => {
  let component: ProfileIconComponent;
  let fixture: ComponentFixture<ProfileIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileIconComponent ],
      imports: [ MatSnackBarModule, MatDialogModule, ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
