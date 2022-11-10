import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {LoaderService} from "../../loader/loader.service";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
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

  // NullInjectorError: R3InjectorError(DynamicTestModule)[LoaderService -> MatDialog -> MatDialog]: NullInjectorError: No provider for MatDialog!
  let LoaderServiceStub: Partial<LoaderService> = {
    show(message: string = "Please wait..."): void {}
  };

  // javascript - NullInjectorError: No provider for MatBottomSheetRef - Stack Overflow https://stackoverflow.com/questions/57846500/nullinjectorerror-no-provider-for-matbottomsheetref
  let MatBottomSheetRefStub:Partial<MatBottomSheetRef> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      providers: [{ provide: NotificationService, useValue: NotificationServiceStub}, {provide: LoaderService, useValue: LoaderServiceStub}, {provide: MatBottomSheetRef, useValue: MatBottomSheetRefStub}],
      //ERROR: 'NG0304: 'mat-form-field' is not a known element (used in the 'SignInComponent' component template):
      // 1. If 'mat-form-field' is an Angular component, then verify that it is a part of an @NgModule where this component is declared.
      // 2. If 'mat-form-field' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.'
      imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
        // [How to import Angular Material in project? \- Stack Overflow](https://stackoverflow.com/questions/45166844/how-to-import-angular-material-in-project)
        MaterialModule /*MatInputModule, MatFormFieldModule*/,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
