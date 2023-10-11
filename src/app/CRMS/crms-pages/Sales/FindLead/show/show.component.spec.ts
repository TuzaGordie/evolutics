import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLeadShowComponent } from './show.component';

describe('FindLeadShowComponent', () => {
  let component: FindLeadShowComponent;
  let fixture: ComponentFixture<FindLeadShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindLeadShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindLeadShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
