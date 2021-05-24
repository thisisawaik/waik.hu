import { TestBed } from '@angular/core/testing';

import { LoadGuard } from './load.guard';

describe('LoadGuard', () => {
  let guard: LoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
