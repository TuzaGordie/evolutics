import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSetupsProductGroupingComponent } from './index-product-grouping.component';

describe('IndexSetupsProductGroupingComponent', () => {
  let component: IndexSetupsProductGroupingComponent;
  let fixture: ComponentFixture<IndexSetupsProductGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSetupsProductGroupingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSetupsProductGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
