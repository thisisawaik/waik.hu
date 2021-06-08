import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getApps, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

import { WalruszComponent } from './walrusz.component';

if(getApps().length === 0) {
  initializeApp(environment.firebaseConfig);
}

describe('WalruszComponent', () => {
  let component: WalruszComponent;
  let fixture: ComponentFixture<WalruszComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalruszComponent ]
    })
    .compileComponents();


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalruszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
