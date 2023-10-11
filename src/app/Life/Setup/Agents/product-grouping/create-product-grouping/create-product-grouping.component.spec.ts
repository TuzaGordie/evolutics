import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSetupsProductGroupingComponent } from './create-product-grouping.component';

describe('CreateSetupsProductGroupingComponent', () => {
  let component: CreateSetupsProductGroupingComponent;
  let fixture: ComponentFixture<CreateSetupsProductGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSetupsProductGroupingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSetupsProductGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
