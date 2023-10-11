import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientgroupShowComponent } from './show.component';

describe('ClientgroupShowComponent', () => {
  let component: ClientgroupShowComponent;
  let fixture: ComponentFixture<ClientgroupShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientgroupShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientgroupShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
