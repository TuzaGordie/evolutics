import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCreateIndexComponent } from './index.component';

describe('LeadCreateIndexComponent', () => {
  let component: LeadCreateIndexComponent;
  let fixture: ComponentFixture<LeadCreateIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCreateIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadCreateIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
