import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSAgentnoteComponent } from './agentnote.component';

describe('CRMSAgentnoteComponent', () => {
  let component: CRMSAgentnoteComponent;
  let fixture: ComponentFixture<CRMSAgentnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSAgentnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSAgentnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
