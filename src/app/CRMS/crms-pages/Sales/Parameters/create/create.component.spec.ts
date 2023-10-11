import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersCreateComponent } from './create.component';

describe('ParametersCreateComponent', () => {
  let component: ParametersCreateComponent;
  let fixture: ComponentFixture<ParametersCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametersCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
