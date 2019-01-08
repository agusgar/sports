import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentroEditComponent } from './encuentro-edit.component';

describe('EncuentroEditComponent', () => {
  let component: EncuentroEditComponent;
  let fixture: ComponentFixture<EncuentroEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuentroEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuentroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
