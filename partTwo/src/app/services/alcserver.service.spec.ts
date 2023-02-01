import { TestBed } from '@angular/core/testing';

import { AlcserverService } from './alcserver.service';

describe('AlcserverService', () => {
  let service: AlcserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlcserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
