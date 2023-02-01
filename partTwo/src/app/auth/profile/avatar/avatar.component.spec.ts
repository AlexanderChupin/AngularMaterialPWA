import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';
import {MatSnackBarRef} from "@angular/material/snack-bar";
import {NotificationService} from "../../../services/notification.service";

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
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
  beforeEach(/*async*/(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarComponent ],
      providers: [{ provide: NotificationService, useValue: NotificationServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
