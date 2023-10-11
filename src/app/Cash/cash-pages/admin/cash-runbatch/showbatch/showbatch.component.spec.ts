import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowbatchComponent } from './showbatch.component';

describe('ShowbatchComponent', () => {
  let component: ShowbatchComponent;
  let fixture: ComponentFixture<ShowbatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowbatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowbatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
