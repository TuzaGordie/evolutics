import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ReinsuranceComponent } from './reinsurance.component';

import { CreateSetupsReInsuranceTreatiesComponent } from './treaties/create-treaties/create-treaties.component';
import { IndexSetupsReInsuranceTreatiesComponent } from './treaties/index-treaties/index-treaties.component';
import { StartSetupsReInsuranceTreatiesComponent } from './treaties/start-treaties/start-treaties.component';
import {ProfitSharingIndexComponent} from "./profitSharing/profit-sharing-index/profit-sharing-index.component";
import {ProfitSharingCreateComponent} from "./profitSharing/profit-sharing-create/profit-sharing-create.component";

export const lifeSetupReinsuRoutes: Routes = [
  {
    path: 'index-treaties',
    data: { title: 'Treaties' },
    component: IndexSetupsReInsuranceTreatiesComponent,
  },
  {
    path: 'start-treaties',
    data: { title: 'Treaties' },
    component: StartSetupsReInsuranceTreatiesComponent,
  },
  {
    path: 'create-treaties',
    data: { title: 'Treaties' },
    component: CreateSetupsReInsuranceTreatiesComponent,
  },
  {
    path: 'profit-sharing-index',
    data: { title: 'Profit-Sharing' },
    component: ProfitSharingIndexComponent,
  },
  {
    path: 'profit-sharing-create',
    data: { title: 'Profit-Sharing' },
    component: ProfitSharingCreateComponent,
  },
];
lifeSetupReinsuRoutes.filter((x) => x.data?.title).forEach((x) => (x.data.title = 'Set Up / Reinsurance / ' + x.data.title));

@NgModule({
  imports: [RouterModule.forChild(lifeSetupReinsuRoutes)],
  exports: [RouterModule],
})
export class ReinsuranceRoutingModule {}
