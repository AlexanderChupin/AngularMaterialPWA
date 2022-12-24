import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlMultiComponent } from './sql-multi.component';

describe('SqlMultiComponent', () => {
  let component: SqlMultiComponent;
  let fixture: ComponentFixture<SqlMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqlMultiComponent ]
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
