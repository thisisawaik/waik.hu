import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MatSnackBarModule ],
      declarations: [ MatSnackBarModule ],
    });
    service = TestBed.inject(MessagesService);
  });

  //it('should be created', () => {
  //  expect(service).toBeTruthy();
  //});
});
