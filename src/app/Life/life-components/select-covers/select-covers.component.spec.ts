import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCoversComponent } from './select-covers.component';

describe('SelectCoversComponent', () => {
  let component: SelectCoversComponent;
  let fixture: ComponentFixture<SelectCoversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCoversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
