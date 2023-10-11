import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSNextofkinComponent } from './nextofkin.component';

describe('CRMSNextofkinComponent', () => {
  let component: CRMSNextofkinComponent;
  let fixture: ComponentFixture<CRMSNextofkinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSNextofkinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSNextofkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
