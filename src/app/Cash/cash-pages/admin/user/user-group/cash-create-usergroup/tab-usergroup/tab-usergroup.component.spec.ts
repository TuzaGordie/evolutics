import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUsergroupComponent } from './tab-usergroup.component';

describe('TabUsergroupComponent', () => {
  let component: TabUsergroupComponent;
  let fixture: ComponentFixture<TabUsergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabUsergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabUsergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
