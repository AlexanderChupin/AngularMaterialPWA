import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { CountryCodeSelectComponent } from './country-code-select.component';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {FilterPipe} from "./filter.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatListModule} from "@angular/material/list";

describe('CountryCodeSelectComponent', () => {
  let component: CountryCodeSelectComponent;
  let fixture: ComponentFixture<CountryCodeSelectComponent>;
  // javascript - NullInjectorError: No provider for MatBottomSheetRef - Stack Overflow https://stackoverflow.com/questions/57846500/nullinjectorerror-no-provider-for-matbottomsheetref
  let MatBottomSheetRefStub:Partial<MatBottomSheetRef> = {};

  beforeEach(waitForAsync(/*async*/() => {
    /*await*/ TestBed.configureTestingModule({
      // Angular - NG0302: Pipe not found! https://angular.io/errors/NG0302
      // Error: NG0302: The pipe 'filter' could not be found in the 'CountryCodeSelectComponent' component. Verify that it is declared or imported in this module. Find more at https://angular.io/errors/NG0302
      declarations: [ CountryCodeSelectComponent, FilterPipe ],
      // ERROR: 'NG0304: 'mat-form-field' is not a known element (used in the 'CountryCodeSelectComponent' component template):
      // 1. If 'mat-form-field' is an Angular component, then verify that it is a part of an @NgModule where this component is declared.
      // 2. If 'mat-form-field' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.'
      imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
        //ERROR: 'NG0304: 'mat-nav-list' is not a known element (used in the 'CountryCodeSelectComponent' component template):
        // 1. If 'mat-nav-list' is an Angular component, then verify that it is a part of an @NgModule where this component is declared.
        // 2. If 'mat-nav-list' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.'
        MatListModule],
      providers:[{ provide: MatBottomSheetRef, useValue: MatBottomSheetRefStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCodeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
