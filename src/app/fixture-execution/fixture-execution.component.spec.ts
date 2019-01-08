import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureExecutionComponent } from './fixture-execution.component';

describe('FixtureExecutionComponent', () => {
  let component: FixtureExecutionComponent;
  let fixture: ComponentFixture<FixtureExecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixtureExecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
