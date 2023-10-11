import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationnoteComponent } from './quotationnote.component';

describe('QuotationnoteComponent', () => {
  let component: QuotationnoteComponent;
  let fixture: ComponentFixture<QuotationnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
