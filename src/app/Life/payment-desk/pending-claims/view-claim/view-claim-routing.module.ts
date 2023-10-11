import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ERModule } from 'src/app/Reusables/reusable-extras/reusable.model';
import { ViewClaimHistoryComponent } from './view-claim-history/view-claim-history.component';
import { ViewClaimRequirementComponent } from "./view-claim-requirement/view-claim-requirement.component";
import { ViewClaimComponent } from './view-claim.component';

const routes: Routes = [
  { path: '', component: ViewClaimComponent },

  {
    path: 'documents',
    loadChildren: () =>
      import(
        '../../../../Reusables/reusable-pages/document-list/document-list.module'
      ).then((m) => m.DocumentListModule),
    data: { title: 'View Payment / Documents', rModule: ERModule.payment },
  },
  {
    path: 'workflows',
    loadChildren: () =>
      import(
        '../../../../Reusables/reusable-pages/workflow-list/workflow-list.module'
      ).then((m) => m.WorkflowListModule),
    data: { title: 'View Payment / Workflows', rModule: ERModule.payment },
  },
  {
    path: 'endorsements',
    loadChildren: () =>
      import(
        '../../../../Reusables/reusable-pages/endorsement-list/endorsement-list.module'
      ).then((m) => m.EndorsementListModule),
    data: { title: 'View Payment / Endorsements', rModule: ERModule.payment },
  },
  {
    path: 'reinsurances',
    loadChildren: () =>
      import(
        '../../../../Reusables/reusable-pages/reinsurance-list/reinsurance-list.module'
      ).then((m) => m.ReinsuranceListModule),
    data: { title: 'View Payment / Reinsurances', rModule: ERModule.payment },
  },
  {
    path: 'pricings',
    loadChildren: () =>
      import(
        '../../../../Reusables/reusable-pages/pricing-list/pricing-list.module'
      ).then((m) => m.PricingListModule),
    data: { title: 'View Payment / Pricings', rModule: ERModule.payment },
  },
  {
    path: 'underwritings',
    loadChildren: () =>
      import(
        '../../../../Reusables/reusable-pages/underwriting-list/underwriting-list.module'
      ).then((m) => m.UnderwritingListModule),
    data: { title: 'View Payment / Underwriting', rModule: ERModule.payment },
  },
  {
    path: 'commissions',
    loadChildren: () =>
      import(
        '../../../../Reusables/reusable-pages/commission-list/commission-list.module'
      ).then((m) => m.CommissionListModule),
    data: { title: 'View Payment / Commissions', rModule: ERModule.payment },
  },
  {
    path: 'future-actions',
    loadChildren: () =>
      import(
        '../../../../Reusables/reusable-pages/future-action-list/future-action-list.module'
      ).then((m) => m.FutureActionListModule),
    data: { title: 'View Payment / Future Actions', rModule: ERModule.payment },
  },
  {
    path: 'perils',
    loadChildren: () =>
      import(
        '../../../../Reusables/reusable-pages/peril-list/peril-list.module'
      ).then((m) => m.PerilListModule),
    data: { title: 'View Payment / Perils', rModule: ERModule.payment },
  }, 
    {path: 'requirement', component: ViewClaimRequirementComponent},
    {path: 'history', component: ViewClaimHistoryComponent},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewClaimRoutingModule {
}
