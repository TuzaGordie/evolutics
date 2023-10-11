import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScSavingsComponent } from './sc-savings.component';

describe('ScSavingsComponent', () => {
  let component: ScSavingsComponent;
  let fixture: ComponentFixture<ScSavingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScSavingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
