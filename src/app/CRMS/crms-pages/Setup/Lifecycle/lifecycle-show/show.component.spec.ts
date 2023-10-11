import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecycleShowComponent } from './show.component';

describe('LifecycleShowComponent', () => {
  let component: LifecycleShowComponent;
  let fixture: ComponentFixture<LifecycleShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifecycleShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifecycleShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
