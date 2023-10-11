import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProductCodeComponent } from './index-product-code.component';

describe('IndexProductCodeComponent', () => {
  let component: IndexProductCodeComponent;
  let fixture: ComponentFixture<IndexProductCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexProductCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexProductCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
