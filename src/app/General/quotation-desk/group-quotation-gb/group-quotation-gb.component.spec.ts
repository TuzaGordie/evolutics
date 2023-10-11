import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupQuotationGBComponent } from './group-quotation-gb.component';

describe('GroupQuotationGBComponent', () => {
  let component: GroupQuotationGBComponent;
  let fixture: ComponentFixture<GroupQuotationGBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupQuotationGBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupQuotationGBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
