import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaderTaskComponent } from './uploader-task.component';

describe('UploaderTaskComponent', () => {
  let component: UploaderTaskComponent;
  let fixture: ComponentFixture<UploaderTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploaderTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
