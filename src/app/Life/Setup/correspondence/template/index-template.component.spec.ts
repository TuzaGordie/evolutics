import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCorrespondenceTemplate } from './index-template.component';

describe('IndexCorrespondenceTemplate', () => {
  let component: IndexCorrespondenceTemplate;
  let fixture: ComponentFixture<IndexCorrespondenceTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCorrespondenceTemplate ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCorrespondenceTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
