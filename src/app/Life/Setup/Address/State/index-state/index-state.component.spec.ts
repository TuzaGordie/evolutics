import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexStateComponent } from './index-state.component';

describe('IndexStateComponent', () => {
  let component: IndexStateComponent;
  let fixture: ComponentFixture<IndexStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
