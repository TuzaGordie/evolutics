import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeViewQuotationComponent } from './view-quotation.component';

describe('ViewQuotationComponent', () => {
  let component: LifeViewQuotationComponent;
  let fixture: ComponentFixture<LifeViewQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LifeViewQuotationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeViewQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
