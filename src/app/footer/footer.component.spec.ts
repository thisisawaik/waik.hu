import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getApps, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

import { FooterComponent } from './footer.component';

if(getApps().length === 0) {
  initializeApp(environment.firebaseConfig);
}

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
