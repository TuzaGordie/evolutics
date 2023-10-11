import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdjustAccountMappingComponent } from './create-adjust-account-mapping.component';

describe('CreateAdjustAccountMappingComponent', () => {
  let component: CreateAdjustAccountMappingComponent;
  let fixture: ComponentFixture<CreateAdjustAccountMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdjustAccountMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdjustAccountMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
