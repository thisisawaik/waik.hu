import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NorticusComponent } from './norticus.component';

describe('NorticusComponent', () => {
  let component: NorticusComponent;
  let fixture: ComponentFixture<NorticusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NorticusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NorticusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
