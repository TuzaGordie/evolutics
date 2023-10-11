import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandsIndexComponent } from './index.component';

describe('BandsIndexComponent', () => {
  let component: BandsIndexComponent;
  let fixture: ComponentFixture<BandsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
