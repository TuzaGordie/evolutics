import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersShowComponent } from './show.component';

describe('ParametersShowComponent', () => {
  let component: ParametersShowComponent;
  let fixture: ComponentFixture<ParametersShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametersShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
