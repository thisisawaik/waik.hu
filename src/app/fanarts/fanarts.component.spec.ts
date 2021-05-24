import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanartsComponent } from './fanarts.component';

describe('FanartsComponent', () => {
  let component: FanartsComponent;
  let fixture: ComponentFixture<FanartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FanartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FanartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
