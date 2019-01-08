import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoEditComponent } from './resultado-edit.component';

describe('ResultadoEditComponent', () => {
  let component: ResultadoEditComponent;
  let fixture: ComponentFixture<ResultadoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
