import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreconciledTrasactionComponent } from './unreconciled-trasaction.component';

describe('UnreconciledTrasactionComponent', () => {
  let component: UnreconciledTrasactionComponent;
  let fixture: ComponentFixture<UnreconciledTrasactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnreconciledTrasactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnreconciledTrasactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
