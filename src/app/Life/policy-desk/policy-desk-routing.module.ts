import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { ERModule } from 'src/app/Reusables/reusable-extras/reusable.model';

const policyDeskRoutes: Routes = [
  {
    path: appRoutes.life.policy.find._,
    data: { title: 'Find Policy' },
    loadChildren: () =>
      import('./policy-desk-pages/find-policy/find-policy.module').then(
        (m) => m.FindPolicyModule
      ),
  },
  {
    path: appRoutes.life.policy.overview._,
    data: { title: 'Policy Desk Overview' },
    loadChildren: () =>
      import(
        './policy-desk-pages/policy-desk-overview/policy-desk-overview.module'
      ).then((m) => m.PolicyDeskOverviewModule),
  },
  {
    path: 'search-list',
    data: { title: 'Find Policy / Search List' },
    loadChildren: () =>
      import(
        './policy-desk-pages/search-policy-list/search-policy-list.module'
      ).then((m) => m.SearchPolicyListModule),
  },
  {
    path: appRoutes.life.policy.vp._,
    data: { title: 'View Policy' },
    loadChildren: () =>
      import('./policy-desk-pages/view-policy/view-policy.module').then(
        (m) => m.ViewPolicyModule
      ),
  },
];
export const viewLifePolicyButtonsRoutes: Routes = [
  {
    path: appRoutes.life.policy.pa._,
    data: { title: 'Accounts' },
    loadChildren: () =>
      import(
        './policy-desk-pages-2/policy-accounts/policy-accounts.module'
      ).then((m) => m.PolicyAccountsModule),
  },
  {
    path: appRoutes.life.policy.pa2._,
    data: { title: 'Annuities' },
    loadChildren: () =>
      import(
        './policy-desk-pages-2/policy-annuities/policy-annuities.module'
      ).then((m) => m.PolicyAnnuitiesModule),
  },
  {
    path: appRoutes.life.policy.par._,
    data: { title: 'Add Rider' },
    loadChildren: () =>
      import(
        './policy-desk-pages/policy-add-rider/policy-add-rider.module'
      ).then((m) => m.PolicyAddRiderModule),
  },
  {
    path: appRoutes.life.policy.pc._,
    data: { title: 'Commissions', rModule: ERModule.policy  },
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/commission-list/commission-list.module'
      ).then((m) => m.CommissionListModule),
  },
  {
    path: appRoutes.life.policy.pcn._,
    data: { title: 'Credit Note' },
    loadChildren: () =>
      import(
        './policy-desk-pages-2/policy-credit-note/policy-credit-note.module'
      ).then((m) => m.PolicyCreditNoteModule),
  },
  {
    path: appRoutes.life.policy.pds._,
    data: { title: 'Documents', rModule: ERModule.policy },
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/document-list/document-list.module'
      ).then((m) => m.DocumentListModule),
  },
  {
    path: appRoutes.life.policy.pds._,
    data: { title: 'Documents' },
    loadChildren: () =>
      import(
        './policy-desk-pages/policy-documents/policy-documents.module'
      ).then((m) => m.PolicyDocumentsModule),
  },
  {
    path: appRoutes.life.policy.pe._,
    data: { title: 'Endorsements', rModule: ERModule.policy },
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/endorsement-list/endorsement-list.module'
      ).then((m) => m.EndorsementListModule),
  },
  {
    path: appRoutes.life.policy.pfa._,
    data: { title: 'Future Actions', rModule: ERModule.policy  },
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/future-action-list/future-action-list.module'
      ).then((m) => m.FutureActionListModule),
  },
  {
    path: appRoutes.life.policy.pn._,
    data: { title: 'Notes' , rModule: ERModule.policy },
    loadChildren: () =>
      import('../../Reusables/reusable-pages/notes/notes.module').then(
        (m) => m.NotesModule
      ),
  },
  {
    path: appRoutes.life.policy.pp._,
    data: { title: 'Pricing', rModule: ERModule.policy  },
    loadChildren: () =>
      import('../../Reusables/reusable-pages/pricing-list/pricing-list.module').then(
        (m) => m.PricingListModule
      ),
  },
  {
    path: appRoutes.life.policy.pppo._,
    data: { title: 'Pending Payments Outward' },
    loadChildren: () =>
      import(
        './policy-desk-pages-2/policy-pending-payments-outward/policy-pending-payments-outward.module'
      ).then((m) => m.PolicyPendingPaymentsOutwardModule),
  },
  {
    path: appRoutes.life.policy.pprls._,
    data: { title: 'Perils', rModule: ERModule.policy  },
    loadChildren: () =>
      import('../../Reusables/reusable-pages/peril-list/peril-list.module').then(
        (m) => m.PerilListModule
      ),
  },
  {
    path: appRoutes.life.policy.pr._,
    data: { title: 'Reinsurance', rModule: ERModule.policy  },
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/reinsurance-list/reinsurance-list.module'
      ).then((m) => m.ReinsuranceListModule),
  },
  {
    path: appRoutes.life.policy.pr2._,
    data: { title: 'Relationships' },
    loadChildren: () =>
      import(
        './policy-desk-pages-2/policy-relationships/policy-relationships.module'
      ).then((m) => m.PolicyRelationshipsModule),
  },
  {
    path: appRoutes.life.policy.ps._,
    data: { title: 'Total Payments Received / Statement' },
    loadChildren: () =>
      import(
        './policy-desk-pages-2/policy-total-payments-received/statements/statements.module'
      ).then((m) => m.StatementsModule),
  },
  {
    path: appRoutes.life.policy.ptpo._,
    data: { title: 'Total Payments Outward' },
    loadChildren: () =>
      import(
        './policy-desk-pages-2/policy-total-payments-outward/policy-total-payments-outward.module'
      ).then((m) => m.PolicyTotalPaymentsOutwardModule),
  },
  {
    path: appRoutes.life.policy.ptpr._,
    data: { title: 'Total Payments Received' },
    loadChildren: () =>
      import(
        './policy-desk-pages-2/policy-total-payments-received/policy-total-payments-received.module'
      ).then((m) => m.PolicyTotalPaymentsReceivedModule),
  },
  {
    path: appRoutes.life.policy.pu._,
    data: { title: 'Underwriting', rModule: ERModule.policy  },
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/underwriting-list/underwriting-list.module'
      ).then((m) => m.UnderwritingListModule),
  },
  {
    path: appRoutes.life.policy.pw._,
    data: { title: 'Workflows', rModule: ERModule.policy  },
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/workflow-list/workflow-list.module'
      ).then((m) => m.WorkflowListModule),
  },
];
viewLifePolicyButtonsRoutes
  .filter((x) => x.data?.title)
  .forEach((x) => (x.data.title = 'View Policy / ' + x.data.title));
viewLifePolicyButtonsRoutes.push(...policyDeskRoutes);
console.log('POLICY ROUTES', viewLifePolicyButtonsRoutes);
@NgModule({
  imports: [RouterModule.forChild(viewLifePolicyButtonsRoutes)],
  exports: [RouterModule],
})
export class PolicyDeskRoutingModule {}
