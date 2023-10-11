import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScEndowmentComponent } from './sc-endowment.component';

describe('ScEndowmentComponent', () => {
  let component: ScEndowmentComponent;
  let fixture: ComponentFixture<ScEndowmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScEndowmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScEndowmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
