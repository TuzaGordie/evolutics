import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBudgetComponent } from './index-budget.component';

describe('IndexBudgetComponent', () => {
  let component: IndexBudgetComponent;
  let fixture: ComponentFixture<IndexBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
