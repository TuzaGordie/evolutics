import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CRMSadminuserComponent } from '../adminuser/lifeadminuser.component';
import { CRMSadminusermenuComponent } from './lifeadminusermenu.component';

describe('CRMSadminusermenuComponent', () => {
  let component: CRMSadminusermenuComponent;
  let fixture: ComponentFixture<CRMSadminusermenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSadminusermenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSadminusermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
