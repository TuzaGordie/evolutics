import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSetupsCommissionCodeComponent } from './index-commission-code.component';

describe('IndexSetupsCommissionCodeComponent', () => {
  let component: IndexSetupsCommissionCodeComponent;
  let fixture: ComponentFixture<IndexSetupsCommissionCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSetupsCommissionCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSetupsCommissionCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
