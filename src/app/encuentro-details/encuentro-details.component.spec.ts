import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentroDetailsComponent } from './encuentro-details.component';

describe('EncuentroDetailsComponent', () => {
  let component: EncuentroDetailsComponent;
  let fixture: ComponentFixture<EncuentroDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuentroDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuentroDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
