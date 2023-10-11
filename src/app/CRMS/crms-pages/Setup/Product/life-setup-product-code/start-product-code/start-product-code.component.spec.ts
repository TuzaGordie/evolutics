import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSStartProductCodeComponent } from './start-product-code.component';

describe('CRMSStartProductCodeComponent', () => {
  let component: CRMSStartProductCodeComponent;
  let fixture: ComponentFixture<CRMSStartProductCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSStartProductCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSStartProductCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
