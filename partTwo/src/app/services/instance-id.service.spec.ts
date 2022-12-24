import { TestBed } from '@angular/core/testing';

import { InstanceIdService } from './instance-id.service';

describe('InstanceIdService', () => {
  let service: InstanceIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstanceIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
