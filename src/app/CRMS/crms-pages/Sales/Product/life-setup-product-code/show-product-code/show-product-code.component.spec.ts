import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSShowProductCodeComponent } from './show-product-code.component';

describe('CRMSShowProductCodeComponent', () => {
  let component: CRMSShowProductCodeComponent;
  let fixture: ComponentFixture<CRMSShowProductCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSShowProductCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSShowProductCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
