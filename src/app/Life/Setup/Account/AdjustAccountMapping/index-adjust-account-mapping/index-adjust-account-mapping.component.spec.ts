import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAdjustAccountMappingComponent } from './index-adjust-account-mapping.component';

describe('IndexAdjustAccountMappingComponent', () => {
  let component: IndexAdjustAccountMappingComponent;
  let fixture: ComponentFixture<IndexAdjustAccountMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexAdjustAccountMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAdjustAccountMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
