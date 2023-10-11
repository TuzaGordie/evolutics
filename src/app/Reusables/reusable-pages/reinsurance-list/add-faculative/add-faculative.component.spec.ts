import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaculativeComponent } from './add-faculative.component';

describe('AddFaculativeComponent', () => {
  let component: AddFaculativeComponent;
  let fixture: ComponentFixture<AddFaculativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFaculativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFaculativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
