import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import {HttpClientModule} from "@angular/common/http";

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // ALC. solving for: NullInjectorError: R3InjectorError(DynamicTestModule)[HttpService -> HttpClient -> HttpClient]:
      //   NullInjectorError: No provider for HttpClient!
      imports: [HttpClientModule]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
