import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCoverCodeComponent } from './show-cover-code.component';

describe('ShowCoverCodeComponent', () => {
  let component: ShowCoverCodeComponent;
  let fixture: ComponentFixture<ShowCoverCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCoverCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCoverCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
