import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordNewsComponent } from './discord-news.component';

describe('DiscordNewsComponent', () => {
  let component: DiscordNewsComponent;
  let fixture: ComponentFixture<DiscordNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscordNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscordNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
