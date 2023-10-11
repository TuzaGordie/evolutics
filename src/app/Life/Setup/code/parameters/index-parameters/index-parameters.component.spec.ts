import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCodeParametersComponent } from './index-parameters.component';

describe('IndexCodeParametersComponent', () => {
  let component: IndexCodeParametersComponent;
  let fixture: ComponentFixture<IndexCodeParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCodeParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCodeParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
