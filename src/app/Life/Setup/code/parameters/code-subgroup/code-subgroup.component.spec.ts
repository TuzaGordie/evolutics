import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSubgroupComponent } from './code-subgroup.component';

describe('CodeSubgroupComponent', () => {
  let component: CodeSubgroupComponent;
  let fixture: ComponentFixture<CodeSubgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeSubgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
