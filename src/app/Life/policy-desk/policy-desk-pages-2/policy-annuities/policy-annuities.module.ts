import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyAnnuitiesRoutingModule } from './policy-annuities-routing.module';
import { PolicyAnnuitiesComponent } from './policy-annuities.component';
import { PdSharedModule } from '../../policy-desk-extras/pd-shared.module';
import { TablePlainModule } from '../../../../Shared/components/table-plain/table-plain.module';
import { CreateNewAnnuityComponent } from './create-new-annuity/create-new-annuity.component';
import { AnnuityDetailsComponent } from './annuity-details/annuity-details.component';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    PolicyAnnuitiesComponent,
    CreateNewAnnuityComponent,
    AnnuityDetailsComponent,
  ],
  imports: [
    CommonModule,
    PolicyAnnuitiesRoutingModule,
    PdSharedModule,
    TablePlainModule,
    SharedModule
  ],
  exports: [CreateNewAnnuityComponent, AnnuityDetailsComponent],
})
export class PolicyAnnuitiesModule {}
