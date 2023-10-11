import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCorporateAgentIndexComponent } from './create-corporate-agent-index.component';

describe('CreateCorporateAgentIndexComponent', () => {
  let component: CreateCorporateAgentIndexComponent;
  let fixture: ComponentFixture<CreateCorporateAgentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCorporateAgentIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCorporateAgentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
