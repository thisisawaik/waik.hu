import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeiszlaComponent } from './geiszla.component';

describe('GeiszlaComponent', () => {
  let component: GeiszlaComponent;
  let fixture: ComponentFixture<GeiszlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeiszlaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeiszlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
