import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentnoteComponent } from './agentnote.component';

describe('AgentnoteComponent', () => {
  let component: AgentnoteComponent;
  let fixture: ComponentFixture<AgentnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
