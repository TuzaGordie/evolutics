import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecycleIndexComponent } from './index.component';

describe('LifecycleIndexComponent', () => {
  let component: LifecycleIndexComponent;
  let fixture: ComponentFixture<LifecycleIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifecycleIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifecycleIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
