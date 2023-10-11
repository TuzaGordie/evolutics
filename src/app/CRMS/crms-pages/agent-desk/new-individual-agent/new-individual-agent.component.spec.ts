import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIndividualAgentComponent } from './new-individual-agent.component';

describe('NewIndividualAgentComponent', () => {
  let component: NewIndividualAgentComponent;
  let fixture: ComponentFixture<NewIndividualAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewIndividualAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIndividualAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
