import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyRelationshipsComponent } from './policy-relationships.component';

describe('PolicyRelationshipsComponent', () => {
  let component: PolicyRelationshipsComponent;
  let fixture: ComponentFixture<PolicyRelationshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyRelationshipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyRelationshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
