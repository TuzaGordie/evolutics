import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCodeNumberingComponent } from './index-numbering.component';

describe('IndexCodeNumberingComponent', () => {
  let component: IndexCodeNumberingComponent;
  let fixture: ComponentFixture<IndexCodeNumberingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCodeNumberingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCodeNumberingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
