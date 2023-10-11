import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateIndividualClientComponent } from './allforms/allforms.component';
import { EmployinfoComponent } from './employinfo/employinfo.component';
import { FormheaderComponent } from './formheader/formheader.component';
import { IdentificationComponent } from './identification/identification.component';
import { NextofkinComponent } from './nextofkin/nextofkin.component';
import { PersonalinfoComponent } from './personalinfo/personalinfo.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { RouterModule } from '@angular/router';
import { CreateAccountFormModule } from '../../life-components/create-account-modal/create-account-form/create-account-form.module';
import { SelectClientCreationTypeModule } from '../client-extras/select-client-creation-type/select-client-creation-type.module';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [

    CreateIndividualClientComponent,
    EmployinfoComponent,
    FormheaderComponent,
    IdentificationComponent,
    NextofkinComponent,
    PersonalinfoComponent,
  ],
  exports: [

    CreateIndividualClientComponent,
    EmployinfoComponent,
    FormheaderComponent,
    IdentificationComponent,
    NextofkinComponent,
    PersonalinfoComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CreateAccountFormModule,
    MatMenuModule,
    RouterModule,
    SelectClientCreationTypeModule,
    SharedModule,
  ],
})
export class CreateIndividualClientModule {}
