import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ConvertToPolicyComponent} from './convert-to-policy/convert-to-policy.component';
import {CreateNewGroupQuotationComponent} from './create-new-group-quotation/create-new-group-quotation.component';
import {
  CreateNewIndividualQuotationComponent
} from './create-new-individual-quotation/create-new-individual-quotation.component';
import {QuotationDocumentsComponent} from './documents/documents.component';
import {FindQuotationComponent} from './find-quotation/find-quotation.component';
import {NewGroupQuotationComponent} from './group-quotation/group-quotation.component';
import {NewIndividualQuotationComponent} from './individual-quotation/individual-quotation.component';
import {QuotationDeskOverviewComponent} from './quotation-desk-overview/quotation-desk-overview.component';
import {appRoutes} from 'src/app/configs/app-routes-configs/app-routes.config';
import {LifeQuotationPricingComponent} from './quotation-pricing/quotation-pricing.component';
import {LifeQuotationSearchComponent} from './quotation-search/quotation-search.component';
import {LifeViewQuotationComponent} from './view-quotation/view-quotation.component';
import {ERModule} from 'src/app/Reusables/reusable-extras/reusable.model';
import {
  ClientDetailsResolver,
  GroupOwnerDetailsResolver,
} from '../services/quotation-resolvers.service';
import {EPageType} from 'src/app/Shared/models/index.model';
import {
  ViewQuotationAnnuityPayeeComponent
} from './view-quotation/view-quotation-annuity-payee/view-quotation-annuity-payee.component';
import {ViewQuotationPaymentComponent} from './view-quotation/view-quotation-payment/view-quotation-payment.component';
import {
  ViewQuotationRelationshipsComponent
} from './view-quotation/view-quotation-relationships/view-quotation-relationships.component';
import {FindQuotationGBComponent} from 'src/app/General/quotation-desk/find-quotation-gb/find-quotation-gb.component';
import {
  GroupQuotationGBComponent
} from 'src/app/General/quotation-desk/group-quotation-gb/group-quotation-gb.component';
import {
  NewGroupQuotationGBComponent
} from 'src/app/General/quotation-desk/new-group-quotation-gb/new-group-quotation-gb.component';
import {
  ViewQuotationTotalPeriodicPremiumComponent
} from "./view-quotation/view-quotation-total-periodic-premium/view-quotation-total-periodic-premium.component";

const routes: Routes = [
  {
    path: 'convert-to-policy',
    component: ConvertToPolicyComponent,
    data: {title: 'Quotation Desk / Convert Quote to Policy'},
  },
  {
    path: 'total-periodic-premium',
    component: ViewQuotationTotalPeriodicPremiumComponent,
    data: {title: 'Quotation Desk / Total Periodic Premium'},
  },
  {
    path: 'convert-to-policy/:clientNo',
    component: ConvertToPolicyComponent,
    resolve: {clientDetails: ClientDetailsResolver},
    data: {title: 'Quotation Desk / Convert Quote to Policy'},
  },
  {
    path: 'create-individual-quotation',
    component: NewIndividualQuotationComponent,
    data: {
      title: 'Quotation Desk / Create Individual Quotation',
      type: EPageType.showPage,
    },
  },
  {
    path: 'edit-individual-quotation',
    component: NewIndividualQuotationComponent,
    data: {
      title: 'Quotation Desk / Create Individual Quotation',
      type: EPageType.editPage,
    },
  },
  {
    path: 'create-group-quotation',
    component: GroupQuotationGBComponent,
    data: {title: 'Create New Group Quotation'},
  },
  {
    path: 'create-new-group-quotation',
    component: CreateNewGroupQuotationComponent,
    data: {title: 'Create New Group Quotation'},
  },
  {
    path: 'create-new-group-quotation/:clientNo',
    component: NewGroupQuotationGBComponent,
    resolve: {ownerDetails: GroupOwnerDetailsResolver},
    data: {title: 'Create New Group Quotation'},
  },
  {
    path: 'create-new-individual-quotation',
    component: CreateNewIndividualQuotationComponent,
    // resolve: { clientDetails: ClientDetailsResolver },
    data: {title: 'Quotation Desk / Create Individual Quotation'},
  },
  {
    path: 'create-new-individual-quotation/:clientNo',
    component: CreateNewIndividualQuotationComponent,
    resolve: {clientDetails: ClientDetailsResolver},
    data: {title: 'Quotation Desk / Create Individual Quotation'},
  },
  {
    path: appRoutes.life.quotation.create._,
    children: [
      {
        path: appRoutes.life.quotation.create.individual._,
        component: NewIndividualQuotationComponent,
        data: {title: 'Quotation Desk / Create individual Quotation'},
      },
      {
        path: appRoutes.life.quotation.create.group._,
        component: NewGroupQuotationComponent,
        data: {title: 'Quotation Desk / Create Group Quotation'},
      },
    ],
  },
  {
    path: appRoutes.life.quotation.find._,
    component: FindQuotationComponent,
    data: {title: 'Quotation Desk / Find Quotation'},
  },
  {
    path: appRoutes.life.quotation.overview._,
    component: QuotationDeskOverviewComponent,
    data: {title: 'Quotation Desk / Overview'},
  },
  {
    path: 'quotationdocuments',
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/document-list/document-list.module'
        ).then((m) => m.DocumentListModule),
    data: {title: 'View Quotation / Documents', rModule: ERModule.quotation},
  },
  {
    path: 'quotationdocuments',
    component: QuotationDocumentsComponent,
    data: {title: 'View Quotation / Documents'},
  },

  {
    path: 'quotation-pricing',
    component: LifeQuotationPricingComponent,
    data: {title: 'View Quotation / Pricing'},
  },
  {
    path: 'quotation-pricing',
    component: LifeQuotationPricingComponent,
    data: {title: 'View Quotation / Pricing'},
  },
  {
    path: 'quotation-search',
    component: LifeQuotationSearchComponent,
    data: {title: 'Quotation Desk / Search'},
  },
  {
    path: 'view-quotation',
    component: LifeViewQuotationComponent,
    data: {title: 'View Quotation'},
  },
  {
    path: 'annuity-payee',
    component: ViewQuotationAnnuityPayeeComponent,
    data: {title: 'View Quotation / Annuity Payee'},
  },
  {
    path: 'payment',
    component: ViewQuotationPaymentComponent,
    data: {title: 'View Quotation / Payment'},
  },
  {
    path: 'view-relationships',
    component: ViewQuotationRelationshipsComponent,
    data: {title: 'View Quotation / Relationships'},
  },
];
console.log('Quotation routes', routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotationDeskRoutingModule {
}
