import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSHeaderComponent } from './header.component';

describe('CRMSHeaderComponent', () => {
  let component: CRMSHeaderComponent;
  let fixture: ComponentFixture<CRMSHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
