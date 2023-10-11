import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSetupsTaskSetupComponent } from './index-task-setup.component';

describe('IndexSetupsTaskSetupComponent', () => {
  let component: IndexSetupsTaskSetupComponent;
  let fixture: ComponentFixture<IndexSetupsTaskSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSetupsTaskSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSetupsTaskSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
