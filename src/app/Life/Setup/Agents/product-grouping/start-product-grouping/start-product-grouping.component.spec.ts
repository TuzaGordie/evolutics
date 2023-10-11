import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSetupsProductGroupingComponent } from './start-product-grouping.component';

describe('StartSetupsProductGroupingComponent', () => {
  let component: StartSetupsProductGroupingComponent;
  let fixture: ComponentFixture<StartSetupsProductGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSetupsProductGroupingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSetupsProductGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
