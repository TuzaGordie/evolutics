import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabasedefinitionComponent } from './databasedefinition.component';

describe('DatabasedefinitionComponent', () => {
  let component: DatabasedefinitionComponent;
  let fixture: ComponentFixture<DatabasedefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabasedefinitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabasedefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
