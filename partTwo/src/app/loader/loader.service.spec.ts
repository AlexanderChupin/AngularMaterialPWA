import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import {MaterialModule} from "../material/material.module";

describe('LoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    // NullInjectorError: R3InjectorError(DynamicTestModule)[LoaderService -> MatDialog -> MatDialog]: NullInjectorError: No provider for MatDialog
    imports:[MaterialModule]
  }));

  it('should be created', () => {
    const service: LoaderService = TestBed.get(LoaderService);
    expect(service).toBeTruthy();
  });
});
