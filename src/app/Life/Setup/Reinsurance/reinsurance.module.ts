import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  lifeSetupReinsuRoutes,
  ReinsuranceRoutingModule,
} from './reinsurance-routing.module';
// import { ReinsuranceComponent } from './reinsurance.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';

import { CreateSetupsReInsuranceTreatiesComponent } from './treaties/create-treaties/create-treaties.component';
import { IndexSetupsReInsuranceTreatiesComponent } from './treaties/index-treaties/index-treaties.component';
import { StartSetupsReInsuranceTreatiesComponent } from './treaties/start-treaties/start-treaties.component';
import { ProfitSharingIndexComponent } from './profitSharing/profit-sharing-index/profit-sharing-index.component';
import { ProfitSharingCreateComponent } from './profitSharing/profit-sharing-create/profit-sharing-create.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations: [
    // ReinsuranceComponent,
    CreateSetupsReInsuranceTreatiesComponent,
    IndexSetupsReInsuranceTreatiesComponent,
    StartSetupsReInsuranceTreatiesComponent,
    ProfitSharingIndexComponent,
    ProfitSharingCreateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
   ComponentsModule,
       ReinsuranceRoutingModule
  ],
})
export class ReinsuranceModule {}
