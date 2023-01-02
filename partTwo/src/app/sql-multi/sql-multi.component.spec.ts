import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlMultiComponent } from './sql-multi.component';
import {SqlComponent} from "../sql/sql.component";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "../material/material.module";
import {LoaderService} from "../loader/loader.service";
import {Component} from "@angular/core";

describe('SqlMultiComponent', () => {
  let component: SqlMultiComponent;
  let fixture: ComponentFixture<SqlMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqlMultiComponent, MockSqlComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SqlMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// [javascript \- Angular 2 Karma Test 'component\-name' is not a known element \- Stack Overflow](https://stackoverflow.com/questions/44504468/angular-2-karma-test-component-name-is-not-a-known-element)
@Component({
  selector: 'app-sql',
  template: ''
})
class MockSqlComponent {
}
