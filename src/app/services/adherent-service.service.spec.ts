import { TestBed } from '@angular/core/testing';

import { AdherentServiceService } from './adherent-service.service';

describe('AdherentServiceService', () => {
  let service: AdherentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdherentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
