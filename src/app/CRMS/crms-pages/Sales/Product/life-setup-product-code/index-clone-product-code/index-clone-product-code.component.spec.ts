import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSIndexCloneProductCodeComponent } from './index-clone-product-code.component';

describe('CRMSIndexCloneProductCodeComponent', () => {
  let component: CRMSIndexCloneProductCodeComponent;
  let fixture: ComponentFixture<CRMSIndexCloneProductCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSIndexCloneProductCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSIndexCloneProductCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
