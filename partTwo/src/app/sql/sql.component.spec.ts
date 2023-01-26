import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlComponent } from './sql.component';
import {HttpClientModule} from "@angular/common/http";
import {LoaderService} from "../loader/loader.service";
import {MaterialModule} from "../material/material.module";
import {FormsModule} from "@angular/forms";
import {AppModule} from "../app.module";
import {AlcwebsocketService} from "../services/alcwebsocket.service";

describe('SqlComponent', () => {
  let component: SqlComponent;
  let fixture: ComponentFixture<SqlComponent>;
  let alcwebsocketService: AlcwebsocketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqlComponent ],
      // ALC. solving for: NullInjectorError: R3InjectorError(DynamicTestModule)[HttpService -> HttpClient -> HttpClient]:
      //   NullInjectorError: No provider for HttpClient!
      imports: [/*HttpClientModule, MaterialModule, FormsModule, */AppModule],
      providers: [
        LoaderService,
        //AlcwebsocketService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // alcwebsocketService = TestBed.inject(AlcwebsocketService)
  });

  afterEach(() =>
    component.ngOnDestroy()
  );

  it('should create', () => {
    expect(component)
      .withContext('should create SqlComponent')
      .toBeTruthy();
  });
});
