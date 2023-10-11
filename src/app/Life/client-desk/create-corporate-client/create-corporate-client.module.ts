import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCorporateClientComponent } from './common/common.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { RouterModule } from '@angular/router';
import { CompanyInfoFormComponent } from './company-info-form/company-info-form.component';
import { ContactInfoFormComponent } from './contact-info-form/contact-info-form.component';
import { DirectorsFormComponent } from './directors-form/directors-form.component'; 
import { CreateAccountFormModule } from '../../life-components/create-account-modal/create-account-form/create-account-form.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    DirectorsFormComponent, 
    CreateCorporateClientComponent,
    CompanyInfoFormComponent,
    ContactInfoFormComponent,
  ],
  imports: [CommonModule, SharedModule, ComponentsModule, RouterModule,CreateAccountFormModule,MatMenuModule],
})
export class CreateCorporateClientModule {}
