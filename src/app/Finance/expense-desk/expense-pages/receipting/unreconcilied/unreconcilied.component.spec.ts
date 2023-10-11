import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreconciliedComponent } from './unreconcilied.component';

describe('UnreconciliedComponent', () => {
  let component: UnreconciliedComponent;
  let fixture: ComponentFixture<UnreconciliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnreconciliedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnreconciliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
