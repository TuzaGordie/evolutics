import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRegionComponent } from './start-region.component';

describe('StartRegionComponent', () => {
  let component: StartRegionComponent;
  let fixture: ComponentFixture<StartRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartRegionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
