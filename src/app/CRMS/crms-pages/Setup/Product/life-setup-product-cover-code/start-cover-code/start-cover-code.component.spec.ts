import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCoverCodeComponent } from './start-cover-code.component';

describe('StartCoverCodeComponent', () => {
  let component: StartCoverCodeComponent;
  let fixture: ComponentFixture<StartCoverCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCoverCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCoverCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
