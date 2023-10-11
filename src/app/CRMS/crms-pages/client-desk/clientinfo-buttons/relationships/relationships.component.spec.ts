import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSRelationshipsComponent } from './relationships.component';

describe('CRMSRelationshipsComponent', () => {
  let component: CRMSRelationshipsComponent;
  let fixture: ComponentFixture<CRMSRelationshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSRelationshipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSRelationshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
