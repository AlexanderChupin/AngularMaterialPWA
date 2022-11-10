import { TestBed, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material/material.module";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {AuthService} from "./auth/auth.service";
import Amplify, {Auth} from "@aws-amplify/auth";
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);
Auth.configure(awsconfig);

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app:AppComponent;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule, RouterTestingModule/*RouterModule.forRoot([], Auth.configure(awsconfig)*/],
      providers: [MatSnackBar, Overlay, AuthService],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    app = fixture.debugElement.componentInstance;

    //fixture = TestBed.createComponent(AppComponent);
    //fixture.detectChanges();
    //loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create the app', (() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'AngularPwaPostOne'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(app.title).toEqual('Material PWA');
  });

  it('should render mat-toolbar', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar').textContent).toContain('Material PWA account_circle');
  });
});
