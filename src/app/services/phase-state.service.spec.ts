import { TestBed } from '@angular/core/testing';

import { PhaseStateServiceService } from './phase-state.service';

describe('PhaseStateServiceService', () => {
  let service: PhaseStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhaseStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
