import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSetupsAgentTypeComponent } from './create-agent-type.component';

describe('CreateSetupsAgentTypeComponent', () => {
  let component: CreateSetupsAgentTypeComponent;
  let fixture: ComponentFixture<CreateSetupsAgentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSetupsAgentTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSetupsAgentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
