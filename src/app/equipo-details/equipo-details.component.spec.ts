import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoDetailsComponent } from './equipo-details.component';

describe('EquipoDetailsComponent', () => {
  let component: EquipoDetailsComponent;
  let fixture: ComponentFixture<EquipoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
