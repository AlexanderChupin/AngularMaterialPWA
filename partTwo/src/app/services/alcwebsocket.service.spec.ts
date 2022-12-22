import { TestBed } from '@angular/core/testing';

import { AlcwebsocketService } from './alcwebsocket.service';

describe('AlcwebsocketService', () => {
  let service: AlcwebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlcwebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
