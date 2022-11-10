import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import {MatSnackBarRef} from "@angular/material/snack-bar";

describe('NotificationService', () => {
  // NullInjectorError: R3InjectorError(DynamicTestModule)[NotificationService -> MatSnackBar -> MatSnackBar]: NullInjectorError: No provider for MatSnackBar!
  // stub NotificationServiceStub for test purposes
  let NotificationServiceStub: Partial<NotificationService>;
  NotificationServiceStub = {
    show(message: string, buttonLabel: string = "OK"): MatSnackBarRef<any> {
      const toastTimeout = 8000 ;
      return this.toast.open(message, buttonLabel, {
        duration: toastTimeout
      });
    }
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: NotificationService, useValue: NotificationServiceStub }]
  }));

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
});
