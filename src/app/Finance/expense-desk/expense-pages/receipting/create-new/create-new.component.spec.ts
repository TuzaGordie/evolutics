import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewExpenseComponent } from './create-new.component';

describe('CreateNewComponent', () => {
  let component: CreateNewExpenseComponent;
  let fixture: ComponentFixture<CreateNewExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
