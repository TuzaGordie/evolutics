import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSelectCoverModalComponent } from './add-select-cover-modal.component';

describe('AddSelectCoverModalComponent', () => {
  let component: AddSelectCoverModalComponent;
  let fixture: ComponentFixture<AddSelectCoverModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSelectCoverModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSelectCoverModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
