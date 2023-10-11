import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpostedComponent } from './unposted.component';

describe('UnpostedComponent', () => {
  let component: UnpostedComponent;
  let fixture: ComponentFixture<UnpostedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpostedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
