import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IosInstallComponent } from './ios-install.component';
import {MatSnackBarRef} from "@angular/material/snack-bar";
import {NotificationService} from "../services/notification.service";
import {MaterialModule} from "../material/material.module";

describe('IosInstallComponent', () => {
  let component: IosInstallComponent;
  let fixture: ComponentFixture<IosInstallComponent>;
  // NullInjectorError: R3InjectorError(DynamicTestModule)[MatSnackBarRef -> MatSnackBarRef]: NullInjectorError: No provider for MatSnackBarRef!
  let MatSnackBarRefStub: Partial<MatSnackBarRef<any>> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IosInstallComponent ],
      providers: [{provide:MatSnackBarRef, useValue: MatSnackBarRefStub}],
      // ERROR: 'NG0304: 'mat-icon' is not a known element (used in the 'IosInstallComponent' component template):
      // 1. If 'mat-icon' is an Angular component, then verify that it is a part of an @NgModule where this component is declared.
      // 2. If 'mat-icon' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.'
      imports:[MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IosInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
