import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { ConfirmCodeComponent } from './confirm-code.component';
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {NotificationService} from "../../services/notification.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {RouterTestingModule} from "@angular/router/testing";
import {MaterialModule} from "../../material/material.module";


describe('ConfirmCodeComponent', () => {
  let component: ConfirmCodeComponent;
  let fixture: ComponentFixture<ConfirmCodeComponent>;
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
  // javascript - NullInjectorError: No provider for MatBottomSheetRef - Stack Overflow https://stackoverflow.com/questions/57846500/nullinjectorerror-no-provider-for-matbottomsheetref
  let MatBottomSheetRefStub:Partial<MatBottomSheetRef>;
  MatBottomSheetRefStub = {
  }

  beforeEach(waitForAsync(/*async*/ () => {
    /*await*/ TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule,FormsModule, ReactiveFormsModule,RouterTestingModule/*, Auth.configure(awsconfig)*/],
      providers: [MatSnackBar, Overlay, { provide: NotificationService, useValue: NotificationServiceStub },     { provide: MatBottomSheetRef, useValue: MatBottomSheetRefStub },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }],
      declarations: [ConfirmCodeComponent],
    }).compileComponents();
  }));

  beforeEach(/*async*/ () => {
    fixture = TestBed.createComponent(ConfirmCodeComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    //loader = TestbedHarnessEnvironment.loader(fixture);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
