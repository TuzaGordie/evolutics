import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSetupsAgentTypeComponent } from './index-agent-type.component';

describe('IndexSetupsAgentTypeComponent', () => {
  let component: IndexSetupsAgentTypeComponent;
  let fixture: ComponentFixture<IndexSetupsAgentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSetupsAgentTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSetupsAgentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
