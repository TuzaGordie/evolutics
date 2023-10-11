import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCloneCoverCodeComponent } from './create-clone-cover-code.component';

describe('CreateCloneCoverCodeComponent', () => {
  let component: CreateCloneCoverCodeComponent;
  let fixture: ComponentFixture<CreateCloneCoverCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCloneCoverCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCloneCoverCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
