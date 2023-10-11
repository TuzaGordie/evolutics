import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRegionComponent } from './show-region.component';

describe('ShowRegionComponent', () => {
  let component: ShowRegionComponent;
  let fixture: ComponentFixture<ShowRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRegionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
