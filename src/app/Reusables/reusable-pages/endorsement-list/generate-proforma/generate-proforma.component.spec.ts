import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateProformaComponent } from './generate-proforma.component';

describe('GenerateProformaComponent', () => {
  let component: GenerateProformaComponent;
  let fixture: ComponentFixture<GenerateProformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateProformaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
