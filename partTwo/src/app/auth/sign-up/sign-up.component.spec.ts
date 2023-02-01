import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
// import {NotificationService} from "../../services/notification.service";
// import {LoaderService} from "../../loader/loader.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  //NullInjectorError: R3InjectorError(DynamicTestModule)[MatBottomSheet -> MatBottomSheet]: NullInjectorError: No provider for MatBottomSheet!
  let MatBottomSheetStub:Partial<MatBottomSheet> = {};
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      providers: [{provide: MatBottomSheet, useValue: MatBottomSheetStub}],
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
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
