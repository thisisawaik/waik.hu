import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalruszComponent } from './walrusz.component';

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
