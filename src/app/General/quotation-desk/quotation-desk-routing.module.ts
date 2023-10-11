import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConvertToPolicyComponent } from '../../Life/quotation-desk/convert-to-policy/convert-to-policy.component';
import { CreateNewGroupQuotationComponent } from '../../Life/quotation-desk/create-new-group-quotation/create-new-group-quotation.component';
import { CreateNewIndividualQuotationComponent } from '../../Life/quotation-desk/create-new-individual-quotation/create-new-individual-quotation.component';
import { QuotationDocumentsComponent } from '../../Life/quotation-desk/documents/documents.component';
import { FindQuotationComponent } from '../../Life/quotation-desk/find-quotation/find-quotation.component';
import { NewGroupQuotationComponent } from '../../Life/quotation-desk/group-quotation/group-quotation.component';
import { NewIndividualQuotationComponent } from '../../Life/quotation-desk/individual-quotation/individual-quotation.component';
import { QuotationDeskOverviewComponent } from '../../Life/quotation-desk/quotation-desk-overview/quotation-desk-overview.component';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { LifeQuotationPricingComponent } from 'src/app/Life/quotation-desk/quotation-pricing/quotation-pricing.component';
import { LifeQuotationSearchComponent } from 'src/app/Life/quotation-desk/quotation-search/quotation-search.component';
import { LifeViewQuotationComponent } from 'src/app/Life/quotation-desk/view-quotation/view-quotation.component';
import { ClientDetailsResolver, GroupOwnerDetailsResolver } from '../services/quotation-resolvers.service';
import { CreateNewIndividualQuotationGBComponent } from './create-new-individual-quotation-gb/create-new-individual-quotation-gb.component';
import { GroupQuotationGBComponent } from './group-quotation-gb/group-quotation-gb.component';
import { IndividualQuotationGBComponent } from './individual-quotation-gb/individual-quotation-gb.component';
import { NewGroupQuotationGBComponent } from './new-group-quotation-gb/new-group-quotation-gb.component';
import { FindQuotationGBComponent } from './find-quotation-gb/find-quotation-gb.component';
import { ViewQuotationGBComponent } from './view-quotation-gb/view-quotation-gb.component';
import { ViewQuotationMotorGBComponent } from './view-quotation-motor-gb/view-quotation-motor-gb.component';
import { ViewQuotationPropertyGBComponent } from './view-quotation-property-gb/view-quotation-property-gb.component';
import { ERModule } from 'src/app/Reusables/reusable-extras/reusable.model';

const routes: Routes = [
  {
    path: appRoutes.general.quotation.create._,
    children: [
      { path: appRoutes.general.quotation.create.individual._, component: NewIndividualQuotationComponent, data: { title: 'Quotation Desk / Create individual Quotation' } },
      { path: appRoutes.general.quotation.create.group._, component: NewGroupQuotationComponent, data: { title: 'Quotation Desk / Create Group Quotation' } },
    ],
  },
  { path: appRoutes.general.quotation.find._, component: FindQuotationGBComponent, data: { title: 'Quotation Desk / Find Quotation' } },
  // { path: appRoutes.general.quotation.find._, component: FindQuotationComponent, data: { title: 'Quotation Desk / Find Quotation' } },
  { path: appRoutes.general.quotation.overview._, component: QuotationDeskOverviewComponent, data: { title: 'Quotation Desk / Overview' } },
  { path: 'convert-to-policy', component: ConvertToPolicyComponent, data: { title: 'Convert Quote to Policy' } },
  { path: 'create-group-quotation', component: GroupQuotationGBComponent, data: { title: 'Create New Group Quotation' } },
  { path: 'create-individual-quotation', component: IndividualQuotationGBComponent, data: { title: 'Quotation Desk / Create Individual Quotation' } },
  { path: 'create-new-group-quotation', component: CreateNewGroupQuotationComponent, data: { title: 'Create New Group Quotation' } },
  { path: 'create-new-group-quotation/:clientNo', component: NewGroupQuotationGBComponent, resolve: { ownerDetails: GroupOwnerDetailsResolver }, data: { title: 'Create New Group Quotation' } },
  { path: 'create-new-individual-quotation', component: CreateNewIndividualQuotationComponent },
  { path: 'create-new-individual-quotation', component: CreateNewIndividualQuotationComponent, data: { title: 'Create New Individual Quotation' } },
  { path: 'create-new-individual-quotation/:clientNo', component: CreateNewIndividualQuotationGBComponent, resolve: { clientDetails: ClientDetailsResolver }, data: { title: 'Quotation Desk / Create Individual Quotation' } },
  { path: 'quotation-pricing', component: LifeQuotationPricingComponent, data: { title: 'View Quotation / Pricing' } },
  { path: 'quotation-pricing', component: LifeQuotationPricingComponent, data: { title: 'View Quotation / Pricing' } },
  { path: 'quotation-search', component: LifeQuotationSearchComponent, data: { title: 'Quotation Desk / Search' } },
  // { path: 'quotationdocuments', component: QuotationDocumentsComponent, data: { title: 'View Quotation / Documents' } },
  {
    path: 'quotationdocuments',
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/document-list/document-list.module'
      ).then((m) => m.DocumentListModule),
    data: { title: 'View Quotation / Documents', rModule: ERModule.quotation },
  },
  { path: 'view-quotation-motor', component: ViewQuotationMotorGBComponent, data: { title: 'Quotation Desk / View Quotation - Motor' } },
  { path: 'view-quotation-property', component: ViewQuotationPropertyGBComponent, data: { title: 'Quotation Desk / View Quotation - Property' } },
  // { path: 'view-quotation', component: ViewQuotationGBComponent, data: { title: 'View Quotation' } },
  { path: 'view-quotation', component: LifeViewQuotationComponent, data: { title: 'View Quotation' } },
  { path: 'view-quotation/:quoteNo', component: LifeViewQuotationComponent, data: { title: 'View Quotation' } },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class QuotationDeskRoutingModule {}
