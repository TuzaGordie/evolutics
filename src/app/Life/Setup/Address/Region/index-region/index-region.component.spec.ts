import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexRegionComponent } from './index-region.component';

describe('IndexRegionComponent', () => {
  let component: IndexRegionComponent;
  let fixture: ComponentFixture<IndexRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexRegionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
