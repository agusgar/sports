import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentrosAtDayComponent } from './encuentros-at-day.component';

describe('EncuentrosAtDayComponent', () => {
  let component: EncuentrosAtDayComponent;
  let fixture: ComponentFixture<EncuentrosAtDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuentrosAtDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuentrosAtDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
