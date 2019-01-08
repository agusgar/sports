import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeporteEditComponent } from './deporte-edit.component';

describe('DeporteEditComponent', () => {
  let component: DeporteEditComponent;
  let fixture: ComponentFixture<DeporteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeporteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeporteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
