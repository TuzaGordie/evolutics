import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientgroupCreateComponent } from './create.component';

describe('ClientgroupCreateComponent', () => {
  let component: ClientgroupCreateComponent;
  let fixture: ComponentFixture<ClientgroupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientgroupCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientgroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
