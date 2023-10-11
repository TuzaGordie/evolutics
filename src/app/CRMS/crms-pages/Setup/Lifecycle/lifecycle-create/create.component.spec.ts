import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecycleCreateComponent } from './create.component';

describe('LifecycleCreateComponent', () => {
  let component: LifecycleCreateComponent;
  let fixture: ComponentFixture<LifecycleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifecycleCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifecycleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
