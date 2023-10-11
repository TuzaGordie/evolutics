import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoverCodeComponent } from './create-cover-code.component';

describe('CreateCoverCodeComponent', () => {
  let component: CreateCoverCodeComponent;
  let fixture: ComponentFixture<CreateCoverCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCoverCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCoverCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
