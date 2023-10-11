import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandsCreateComponent } from './create.component';

describe('BandsCreateComponent', () => {
  let component: BandsCreateComponent;
  let fixture: ComponentFixture<BandsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
