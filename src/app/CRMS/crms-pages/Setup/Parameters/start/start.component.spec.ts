import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersStartComponent } from './start.component';

describe('ParametersStartComponent', () => {
  let component: ParametersStartComponent;
  let fixture: ComponentFixture<ParametersStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametersStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
