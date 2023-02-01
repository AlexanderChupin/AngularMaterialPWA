import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MaterialModule} from "../material/material.module";

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  // NullInjectorError: R3InjectorError(DynamicTestModule)[InjectionToken MatDialogData -> InjectionToken MatDialogData]: NullInjectorError: No provider for InjectionToken MatDialogData!
  let MatDialogRefStub: Partial<MatDialogRef<any>> = {};
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderComponent ],
      imports: [MaterialModule],
      providers: [{provide: MatDialogRef, useValue: MatDialogRefStub}, { provide: MAT_DIALOG_DATA, useValue: {}}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
