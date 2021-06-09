import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstiComponent } from './isti.component';

describe('IstiComponent', () => {
  let component: IstiComponent;
  let fixture: ComponentFixture<IstiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IstiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
