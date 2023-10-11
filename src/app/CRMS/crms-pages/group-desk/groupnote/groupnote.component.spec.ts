import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupnoteComponent } from './groupnote.component';

describe('GroupnoteComponent', () => {
  let component: GroupnoteComponent;
  let fixture: ComponentFixture<GroupnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
