import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSetupsTariffsComponent } from './create-tariffs.component';

describe('CreateSetupsTariffsComponent', () => {
  let component: CreateSetupsTariffsComponent;
  let fixture: ComponentFixture<CreateSetupsTariffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSetupsTariffsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSetupsTariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
