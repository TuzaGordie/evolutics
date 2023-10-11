import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuarialHomeComponent } from './actuarial-home.component';

describe('ActuarialHomeComponent', () => {
  let component: ActuarialHomeComponent;
  let fixture: ComponentFixture<ActuarialHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActuarialHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuarialHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
