import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSetupsAgentBandComponent } from './index-agent-band.component';

describe('IndexSetupsAgentBandComponent', () => {
  let component: IndexSetupsAgentBandComponent;
  let fixture: ComponentFixture<IndexSetupsAgentBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSetupsAgentBandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSetupsAgentBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
