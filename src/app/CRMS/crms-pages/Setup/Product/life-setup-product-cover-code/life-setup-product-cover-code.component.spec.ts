import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeSetupProductCoverCodeComponent } from './life-setup-product-cover-code.component';

describe('LifeSetupProductCoverCodeComponent', () => {
  let component: LifeSetupProductCoverCodeComponent;
  let fixture: ComponentFixture<LifeSetupProductCoverCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeSetupProductCoverCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeSetupProductCoverCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
