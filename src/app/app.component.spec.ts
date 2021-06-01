import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { getApps, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';

if(getApps().length === 0) {
  initializeApp(environment.firebaseConfig);
}

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();


  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have image urls`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.tdrImage).not.toBeNull();
    expect(app.istiImage).not.toBeNull();
    expect(app.walruszImage).not.toBeNull();
    expect(app.geiszlaImage).not.toBeNull();
  });

  //it('should render title', () => {
  //  const fixture = TestBed.createComponent(AppComponent);
  //  fixture.detectChanges();
  //  const compiled = fixture.nativeElement;
  //  expect(compiled.querySelector('.content span').textContent).toContain('waik-hu-fy app is running!');
  //});
});
