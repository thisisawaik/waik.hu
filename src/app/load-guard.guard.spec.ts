import { TestBed } from '@angular/core/testing';

import { LoadGuardGuard } from './load-guard.guard';

describe('LoadGuardGuard', () => {
  let guard: LoadGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
