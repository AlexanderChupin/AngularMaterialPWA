import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {NotificationService} from "../../services/notification.service";
import {LoaderService} from "../../loader/loader.service";
import {MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MaterialModule} from "../../material/material.module";
import {AvatarComponent} from "./avatar/avatar.component";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
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
  /*let LoaderServiceStub: Partial<LoaderService> = {
    show(message: string = "Please wait..."): void {}
  };*/

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      //ERROR: 'NG0304: 'app-avatar' is not a known element (used in the 'ProfileComponent' component template):
      // 1. If 'app-avatar' is an Angular component, then verify that it is a part of an @NgModule where this component is declared.
      // 2. If 'app-avatar' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.'
      declarations: [ ProfileComponent, AvatarComponent ],
      // NullInjectorError: R3InjectorError(DynamicTestModule)[NotificationService -> MatSnackBar -> MatSnackBar]:NullInjectorError: No provider for MatSnackBar!
      // NullInjectorError: R3InjectorError(DynamicTestModule)[LoaderService -> MatDialog -> MatDialog]: NullInjectorError: No provider for MatDialog!
      // NullInjectorError: R3InjectorError(DynamicTestModule)[LoaderService -> MatDialog -> Overlay -> Overlay]: NullInjectorError: No provider for Overlay!
      providers: [MatSnackBar,{ provide: NotificationService, useValue: NotificationServiceStub }, LoaderService/*{ provide: LoaderService, useValue: LoaderServiceStub }*//*,MatDialog, Overlay*/],
      // ERROR: 'NG0304: 'mat-form-field' is not a known element (used in the 'ProfileComponent' component template):
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
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
