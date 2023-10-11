import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerExplorerIndexComponent } from './index.component';

describe('CustomerExplorerIndexComponent', () => {
  let component: CustomerExplorerIndexComponent;
  let fixture: ComponentFixture<CustomerExplorerIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerExplorerIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerExplorerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
