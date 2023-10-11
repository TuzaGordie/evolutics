import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsUsermenuComponent } from './tabs-usermenu.component';

describe('TabsUsermenuComponent', () => {
  let component: TabsUsermenuComponent;
  let fixture: ComponentFixture<TabsUsermenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsUsermenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsUsermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
