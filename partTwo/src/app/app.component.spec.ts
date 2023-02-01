import {TestBed, ComponentFixture, waitForAsync} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material/material.module";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {AuthService} from "./auth/auth.service";
import Amplify, {Auth} from "@aws-amplify/auth";
import awsconfig from '../aws-exports';
import {AlcserverService, alcServerState} from "./services/alcserver.service";
import {of, Subject} from "rxjs";
Amplify.configure(awsconfig);
Auth.configure(awsconfig);

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app:AppComponent;
  // let alcserverServiceStub: AlcserverService;

  beforeEach(waitForAsync(() => {
    const spy = {
      //serverState$: new Subject(),
      stateForIcon: of(true)
    }
    let alcserverServiceStub = { provide: AlcserverService, useValue: spy
    }
    /*await*/ TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule, RouterTestingModule/*RouterModule.forRoot([], Auth.configure(awsconfig)*/],
      providers: [MatSnackBar, Overlay, AuthService, alcserverServiceStub],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    app = fixture.debugElement.componentInstance;

    /**
     * Get the mocked service here from our fixture
     * and add a spyOn over-ride to pretend we have
     * a logged in user.
     */
  });

  it('should create the app', (() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'AngularPwaPostOne'`, () => {
    //const fixture = TestBed.createComponent(AppComponent);
    expect(app.title).toEqual('Material PWA');
  });

  it('should render mat-toolbar', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar').textContent).toContain('Material PWA');
  });

  it('should display server up icon enabled', () => {
    const compiled = fixture.debugElement.nativeElement;
    const matToolBar = compiled.querySelector('.mat-toolbar');
    expect(matToolBar.querySelector('.mat-fab').disabled).not.toBeTruthy();
    expect(matToolBar.querySelector('.mat-fab .mat-icon')).toBeTruthy();
    expect(matToolBar.querySelector('.mat-fab .mat-icon').textContent).toEqual('wifi');
  });
});
