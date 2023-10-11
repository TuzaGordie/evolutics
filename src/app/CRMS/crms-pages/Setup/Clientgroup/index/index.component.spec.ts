import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientgroupIndexComponent } from './index.component';

describe('ClientgroupIndexComponent', () => {
  let component: ClientgroupIndexComponent;
  let fixture: ComponentFixture<ClientgroupIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientgroupIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientgroupIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
