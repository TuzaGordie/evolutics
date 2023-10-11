import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSelectCoverComponent } from './add-select-cover.component';

describe('AddSelectCoverComponent', () => {
  let component: AddSelectCoverComponent;
  let fixture: ComponentFixture<AddSelectCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSelectCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSelectCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
