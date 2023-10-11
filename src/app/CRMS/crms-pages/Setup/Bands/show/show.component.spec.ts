import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandsShowComponent } from './show.component';

describe('BandsShowComponent', () => {
  let component: BandsShowComponent;
  let fixture: ComponentFixture<BandsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandsShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
