import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSIndexProductCodeComponent } from './index-product-code.component';

describe('CRMSIndexProductCodeComponent', () => {
  let component: CRMSIndexProductCodeComponent;
  let fixture: ComponentFixture<CRMSIndexProductCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSIndexProductCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSIndexProductCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
