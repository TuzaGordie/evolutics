import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTownComponent } from './show-town.component';

describe('ShowTownComponent', () => {
  let component: ShowTownComponent;
  let fixture: ComponentFixture<ShowTownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
