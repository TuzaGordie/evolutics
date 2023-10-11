import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCloneCoverCodeComponent } from './index-clone-cover-code.component';

describe('IndexCloneCoverCodeComponent', () => {
  let component: IndexCloneCoverCodeComponent;
  let fixture: ComponentFixture<IndexCloneCoverCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCloneCoverCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCloneCoverCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
