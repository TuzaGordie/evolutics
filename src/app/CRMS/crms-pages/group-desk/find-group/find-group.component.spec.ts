import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindGroupComponent } from './find-group.component';

describe('FindGroupComponent', () => {
  let component: FindGroupComponent;
  let fixture: ComponentFixture<FindGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
