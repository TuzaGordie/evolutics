import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCoverCodeComponent } from './index-cover-code.component';

describe('IndexCoverCodeComponent', () => {
  let component: IndexCoverCodeComponent;
  let fixture: ComponentFixture<IndexCoverCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCoverCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCoverCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
