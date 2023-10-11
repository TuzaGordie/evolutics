import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTownComponent } from './index-town.component';

describe('IndexTownComponent', () => {
  let component: IndexTownComponent;
  let fixture: ComponentFixture<IndexTownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexTownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
