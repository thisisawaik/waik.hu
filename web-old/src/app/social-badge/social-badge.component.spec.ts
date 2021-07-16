import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialBadgeComponent } from './social-badge.component';

describe('SocialBadgeComponent', () => {
  let component: SocialBadgeComponent;
  let fixture: ComponentFixture<SocialBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
