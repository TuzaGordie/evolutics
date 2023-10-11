import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCorrespondenceTemplateComponent } from './update-template.component';

describe('UploadTemplateComponent', () => {
  let component: UpdateCorrespondenceTemplateComponent;
  let fixture: ComponentFixture<UpdateCorrespondenceTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCorrespondenceTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCorrespondenceTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
