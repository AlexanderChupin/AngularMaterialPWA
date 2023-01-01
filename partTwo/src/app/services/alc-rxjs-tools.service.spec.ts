import { TestBed } from '@angular/core/testing';

import { AlcRxjsToolsService } from './alc-rxjs-tools.service';

describe('AlcRxjsToolsService', () => {
  let service: AlcRxjsToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlcRxjsToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
