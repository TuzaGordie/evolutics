import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSetupsTariffsComponent } from './index-tariffs.component';

describe('IndexSetupsTariffsComponent', () => {
  let component: IndexSetupsTariffsComponent;
  let fixture: ComponentFixture<IndexSetupsTariffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSetupsTariffsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSetupsTariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
