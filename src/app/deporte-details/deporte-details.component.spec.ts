import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeporteDetailsComponent } from './deporte-details.component';

describe('DeporteDetailsComponent', () => {
  let component: DeporteDetailsComponent;
  let fixture: ComponentFixture<DeporteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeporteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeporteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
