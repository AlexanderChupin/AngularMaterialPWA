import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlComponent } from './sql.component';
import {HttpClientModule} from "@angular/common/http";

describe('SqlComponent', () => {
  let component: SqlComponent;
  let fixture: ComponentFixture<SqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqlComponent ],
      // ALC. solving for: NullInjectorError: R3InjectorError(DynamicTestModule)[HttpService -> HttpClient -> HttpClient]:
      //   NullInjectorError: No provider for HttpClient!
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
