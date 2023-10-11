import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLeadCreateComponent } from './create.component';

describe('FindLeadCreateComponent', () => {
  let component: FindLeadCreateComponent;
  let fixture: ComponentFixture<FindLeadCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindLeadCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindLeadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
