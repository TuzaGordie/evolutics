import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSetupsTariffsComponent } from './start-tariffs.component';

describe('StartSetupsTariffsComponent', () => {
  let component: StartSetupsTariffsComponent;
  let fixture: ComponentFixture<StartSetupsTariffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSetupsTariffsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSetupsTariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
