import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProcessDesignControlComponent } from './index-control.component';

describe('IndexProcessDesignControlComponent', () => {
  let component: IndexProcessDesignControlComponent;
  let fixture: ComponentFixture<IndexProcessDesignControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexProcessDesignControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexProcessDesignControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
