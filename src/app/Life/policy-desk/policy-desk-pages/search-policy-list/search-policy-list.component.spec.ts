import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPolicyListComponent } from './search-policy-list.component';

describe('SearchPolicyListComponent', () => {
  let component: SearchPolicyListComponent;
  let fixture: ComponentFixture<SearchPolicyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPolicyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
