import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientOverviewComponent } from './client-overview/client-overview.component';
import { CreateNewProviderComponent } from './client-provider/client-provider-create/client-provider-create.component';
import { CreateIndividualClientComponent } from './create-individual-client/allforms/allforms.component';
import { CreateCorporateClientComponent } from './create-corporate-client/common/common.component';
import { FindClientComponent } from './find-client/find-client.component';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { ClientProviderIndexComponent } from './client-provider/client-provider-index/client-provider-index.component';
import { ClientSearchComponent } from './client-search/client-search.component';
import { PoliciesComponent } from './clientinfo-buttons/policies/policies.component';
import { RelationshipsComponent } from './clientinfo-buttons/relationships/relationships.component';
import { ClientEndorsementsComponent } from './clientinfo-buttons/endorsements/endorsements.component';
import { ClientUnderwritingEventsComponent } from './clientinfo-buttons/underwriting-events/underwriting-events.component';
import { ClientWebLoginComponent } from './clientinfo-buttons/web-login/web-login.component';
import { ClientWorkflowsComponent } from './clientinfo-buttons/workflows/workflows.component';
import { ClientBusinessComponent } from './clientinfo-buttons/business/business.component';
import { ClientPendingPaymentsComponent } from './clientinfo-buttons/pending-payments/pending-payments.component';
import { ClientPendingQuotesComponent } from './clientinfo-buttons/pending-quotes/pending-quotes.component';
import { LifeClientDeskWebUserCreateComponent } from './web-user/life-client-desk-web-user-create/life-client-desk-web-user-create.component';
import { LifeClientDeskWebUserFindComponent } from './web-user/life-client-desk-web-user-find/life-client-desk-web-user-find.component';
import { ERModule } from 'src/app/Reusables/reusable-extras/reusable.model';
import { WorkflowDocumentlistComponent } from '../Workflow/workflow-create/document-list/workflow-document-list.component';
import { ClientProviderAccountComponent } from './client-provider/client-provider-account/client-provider-account.component';
import { ClientProviderPendingPaymentComponent } from './client-provider/client-provider-pending-payment/client-provider-pending-payment.component';
import { ClientProviderProductMappedComponent } from './client-provider/client-provider-product-mapped/client-provider-product-mapped.component';
import { ClientProviderTarrifComponent } from './client-provider/client-provider-tarrif/client-provider-tarrif.component';
import { ClientProviderPayeeComponent } from './client-provider/client-provider-payee/client-provider-payee.component';
import { ClientProviderLicenseComponent } from './client-provider/client-provider-license/client-provider-license.component';
import { ClientProviderBranchesComponent } from './client-provider/client-provider-branches/client-provider-branches.component';
import { ClientProviderContactPersonComponent } from './client-provider/client-provider-contact-person/client-provider-contact-person.component';

export const lifeClientDeskRoutes: Routes = [
  {
    path: appRoutes.life.client.create._,
    children: [
      {
        path: appRoutes.life.client.create.individual._,
        component: CreateIndividualClientComponent,
        data: { title: 'Client Desk / Create Individual Client' },
      },
      {
        path: appRoutes.life.client.create.corporate._,
        component: CreateCorporateClientComponent,
        data: { title: 'Client Desk / Create Corporate Client' },
      },
      // { path: appRoutes.life.client.create.corporate._, component: CommonComponent, data: { title: 'Client Desk / Create Corporate Client' } },
      // { path: appRoutes.life.client.create.corporate._, component: AllformsComponent, data: { title: 'Client Desk / Create Corporate Client' } },
    ],
  },
  {
    path: 'create-provider-index',
    component: ClientProviderIndexComponent,
    data: { title: 'Client Desk / Create New / Provider' },
  },
  {
    path: 'create-provider',
    component: CreateNewProviderComponent,
    data: { title: 'Client Desk / Create Provider Client' },
  },
  {
    path: 'overview',
    component: ClientOverviewComponent,
    data: { title: 'Client Desk Overview' },
  },
  {
    path: 'web-user-create',
    component: LifeClientDeskWebUserCreateComponent,
    data: { title: 'Client Desk / Web User / Create' },
  },
  {
    path: 'web-user-find',
    component: LifeClientDeskWebUserFindComponent,
    data: { title: 'Client Desk / Web User / Find' },
  },
  {
    path: appRoutes.life.client.find._,
    component: FindClientComponent,
    data: { title: 'Client Desk / Find Client' },
  },
  {
    path: appRoutes.life.client.overview._,
    component: ClientOverviewComponent,
    data: { title: 'Client Desk Overview' },
  },
  {
    path: 'business',
    component: ClientBusinessComponent,
    data: { title: 'View Client / Other Business' },
  },
  {
    path: 'business/:id/:id1',
    component: ClientBusinessComponent,
    data: { title: 'View Client / Other Business' },
  },
  {
    path: 'documents',
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/document-list/document-list.module'
      ).then((m) => m.DocumentListModule),
    data: { title: 'View Client / Documents', rModule: ERModule.client },
  },
  {
    path: 'endorsements',
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/endorsement-list/endorsement-list.module'
      ).then((m) => m.EndorsementListModule),
    data: { title: 'View Client / Endorsements', rModule: ERModule.client },
  },
  {
    path: 'endorsements',
    component: ClientEndorsementsComponent,
    data: { title: 'View Client / Endorsements' },
  },
  {
    path: 'endorsements/:id',
    component: ClientEndorsementsComponent,
    data: { title: 'View Client / Endorsements' },
  },
  {
    path: 'note',
    loadChildren: () =>
      import('../../Reusables/reusable-pages/notes/notes.module').then(
        (m) => m.NotesModule
      ),
    data: { title: 'View Client / Notes', rModule: ERModule.client },
  },
  {
    path: 'pendingpayments',
    component: ClientPendingPaymentsComponent,
    data: { title: 'View Client / Pending Payments' },
  },
  {
    path: 'pendingpayments/:id/:id1',
    component: ClientPendingPaymentsComponent,
    data: { title: 'View Client / Pending Payments' },
  },
  {
    path: 'pendingquotes',
    component: ClientPendingQuotesComponent,
    data: { title: 'View Client / Pending Quotes' },
  },
  {
    path: 'pendingquotes/:id/:id1',
    component: ClientPendingQuotesComponent,
    data: { title: 'View Client / Pending Quotes' },
  },
  {
    path: 'policies',
    component: PoliciesComponent,
    data: { title: 'View Client / Policies' },
  },
  {
    path: 'policies/:id/:id1',
    component: PoliciesComponent,
    data: { title: 'View Client / Policies' },
  },
  {
    path: 'relationships',
    component: RelationshipsComponent,
    data: { title: 'View Client / Relationships' },
  },
  {
    path: 'relationships/:id',
    component: RelationshipsComponent,
    data: { title: 'View Client / Relationships' },
  },
  {
    path: 'search',
    component: ClientSearchComponent,
    data: { title: 'Client Desk / Search' },
  },
  {
    path: 'underwritingevents',
    component: ClientUnderwritingEventsComponent,
    data: { title: 'View Client / Underwriting Events' },
  },
  {
    path: 'underwritingevents/:id',
    component: ClientUnderwritingEventsComponent,
    data: { title: 'View Client / Underwriting Events' },
  },
  {
    path: 'view-client',
    loadChildren: () =>
      import('../../Life/client-desk/view-client/view-client.module').then(
        (m) => m.ViewClientModule
      ),
    data: { title: 'View Client' },
  },
  {
    path: 'view-client/:id',
    loadChildren: () =>
      import('../../Life/client-desk/view-client/view-client.module').then(
        (m) => m.ViewClientModule
      ),
    data: { title: 'View Individual Client' },
  },
  {
    path: 'view-client-corporate',
    loadChildren: () =>
      import(
        '../../Life/client-desk/view-client-corporate/view-client-corporate.module'
      ).then((m) => m.ViewClientCorporateModule),
    data: { title: 'View Corporate Client' },
  },
  {
    path: 'view-client-corporate/:id',
    loadChildren: () =>
      import(
        '../../Life/client-desk/view-client-corporate/view-client-corporate.module'
      ).then((m) => m.ViewClientCorporateModule),
    data: { title: 'View Corporate Client' },
  },
  {
    path: 'view-provider',
    loadChildren: () =>
      import(
        '../../Life/client-desk/client-provider/view-provider/view-provider.module'
      ).then((m) => m.ViewProviderModule),
    data: { title: 'View Provider' },
  },
  {
    path: 'web-login',
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/web-login-list/web-login-list.module'
      ).then((m) => m.WebLoginListModule),
    data: { title: 'View Client / Web Login', rModule: ERModule.client },
  },
  {
    path: 'web-login',
    component: ClientWebLoginComponent,
    data: { title: 'View Client / Web Login' },
  },
  {
    path: 'web-login/:id',
    component: ClientWebLoginComponent,
    data: { title: 'View Client / Web Login' },
  },
  {
    path: 'workflows',
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/workflow-list/workflow-list.module'
      ).then((m) => m.WorkflowListModule),
    data: { title: 'View Client / Workflows', rModule: ERModule.client },
  },
  {
    path: 'workflows',
    component: ClientWorkflowsComponent,
    data: { title: 'View Client / Workflows' },
  },
  {
    path: 'workflows/:id',
    component: ClientWorkflowsComponent,
    data: { title: 'View Client / Workflows' },
  },

  {
    path: 'add-document',
    component: WorkflowDocumentlistComponent,
    data: { title: 'View Client / Document' },
  },
  {
    path: 'account',
    component: ClientProviderAccountComponent,
    data: { title: 'View Provider / Account' },
  },
  {
    path: 'pending-payment',
    component: ClientProviderPendingPaymentComponent,
    data: { title: 'View Provider / Pending Payment' },
  },
  {
    path: 'product-mapped',
    component: ClientProviderProductMappedComponent,
    data: { title: 'View Provider / Product Mapped' },
  },
  {
    path: 'tariff',
    component: ClientProviderTarrifComponent,
    data: { title: 'View Provider / Tariff' },
  },
  {
    path: 'payee',
    component: ClientProviderPayeeComponent,
    data: { title: 'View Provider / Payee' },
  },
  {
    path: 'license',
    component: ClientProviderLicenseComponent,
    data: { title: 'View Provider / License' },
  },
  {
    path: 'branches',
    component: ClientProviderBranchesComponent,
    data: { title: 'View Provider / Branches' },
  },
  {
    path: 'contact-persons',
    component: ClientProviderContactPersonComponent,
    data: { title: 'View Provider / Contact Persons' },
  },
  {
    path: 'disciplines',
    loadChildren: () =>
      import('./client-provider/discipline-list/discipline-list.module').then(
        (m) => m.DisciplineListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(lifeClientDeskRoutes)],
  exports: [RouterModule],
})
export class LifeClientDeskRoutingModule {}
