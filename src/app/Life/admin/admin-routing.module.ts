import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdmindatesComponent } from './admindates/admindates.component';
import { AdminDocumentsComponent } from './documents/documents.component';
import { BatchlogComponent } from './batchlog/batchlog.component';
import { BatchLogFileComponent } from './batch-log-file/batch-log-file.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CreatebatchComponent } from './createbatch/createbatch.component';
import { DatabasedefinitionComponent } from './databasedefinition/databasedefinition.component';
import { InterestcalculationComponent } from './interestcalculation/interestcalculation.component';
import { LifeAdminGatewayComponent } from './life-admin-gateway/life-admin-gateway.component';
import { LifeAdminLotteryIndexComponent } from './life-admin-lottery-index/life-admin-lottery-index.component';
import { LifeAdminLotteryViewComponent } from './life-admin-lottery-view/life-admin-lottery-view.component'; 
import { RunbatchComponent } from './runbatch/runbatch.component';
import { WorkflowDocumentlistComponent } from '../Workflow/workflow-create/document-list/workflow-document-list.component';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { AdminDateDirectDebitComponent } from './admindates/admin-date-direct-debit/admin-date-direct-debit.component';
import { AdminDateSystemComponent } from './admindates/admin-date-system/admin-date-system.component';
import { LifeClientDeskWebUserCreateComponent } from '../client-desk/web-user/life-client-desk-web-user-create/life-client-desk-web-user-create.component';
import { EPageType } from 'src/app/Shared/models/index.model';

export const lifeAdminRoutes: Routes = [
  {
    path: appRoutes.life.admin.dates._,
    component: AdmindatesComponent,
    data: { title: 'Admin / Dates' },
  },
  {
    path: appRoutes.life.admin.dates._ + '/direct-debit',
    component: AdminDateDirectDebitComponent,
    data: { title: 'Admin / Dates / Direct Debit' },
  },
  {
    path: appRoutes.life.admin.dates._ + '/system',
    component: AdminDateSystemComponent,
    data: { title: 'Admin / Dates / System' },
  },
  {
    path: appRoutes.life.admin.dates._ + '/:operation',
    component: AdmindatesComponent,
    data: { title: 'Admin / Dates' },
  },
  {
    path: appRoutes.life.admin.batchLogFiles._,
    component: BatchLogFileComponent,
    data: { title: 'Admin / Batch Log Files' },
  },
  {
    path: appRoutes.life.admin.batchLog._,
    component: BatchlogComponent,
    data: { title: 'Admin / Batch Log' },
  },

  {
    path: 'web-user-create',
    component: LifeClientDeskWebUserCreateComponent,
    data: { title: 'Admin / Web User / Create' },
  },
  {
    path: appRoutes.life.admin.batchLog._ + '/:operation',
    component: BatchlogComponent,
    data: { title: 'Admin / Batch Log' },
  },
  {
    path: appRoutes.life.admin.config._,
    component: ConfigurationComponent,
    data: { title: 'Admin / Configuration' },
  },
  {
    path: appRoutes.life.admin.createBatch._,
    component: CreatebatchComponent,
    data: { title: 'Admin / Create Batch' },
  },
  {
    path: appRoutes.life.admin.createBatch._ + '/:operation',
    component: CreatebatchComponent,
    data: { title: 'Admin / Create Batch' },
  },
  {
    path: appRoutes.life.admin.evolutics._,
    component: DatabasedefinitionComponent,
    data: { title: 'Admin / Database Definition' },
  },
  {
    path: appRoutes.life.admin.documents._,
    component: AdminDocumentsComponent,
    data: { title: 'Admin / Documents' },
  },
  {
    path: appRoutes.life.admin.gateway._,
    children: [
      {
        path: '',
        redirectTo: 'show', 
      },
      {
        path: 'create',
        component: LifeAdminGatewayComponent,
        data: { title: 'Admin / Gateway', type: EPageType.createPage },
      },
      {
        path: 'edit',
        component: LifeAdminGatewayComponent,
        data: { title: 'Admin / Edit Gateway', type: EPageType.editPage },
      },
      {
        path: 'show',
        component: LifeAdminGatewayComponent,
        data: { title: 'Admin / Gateway', type: EPageType.showPage },
      },
    ],
  },

  {
    path: appRoutes.life.admin.intRecal._,
    component: InterestcalculationComponent,
    data: { title: 'Admin / Interest Calculation' },
  },
  {
    path: appRoutes.life.admin.intRecal._ + '/:operation',
    component: InterestcalculationComponent,
    data: { title: 'Admin / Interest Calculation' },
  },
  {
    path: appRoutes.life.admin.lottery._,
    component: LifeAdminLotteryIndexComponent,
    data: { title: 'Admin / Lottery' },
  },
  {
    path: 'lottery-view',
    component: LifeAdminLotteryViewComponent,
    data: { title: 'Admin / Lottery' },
  },
  {
    path: appRoutes.life.admin.runBatch._,
    component: RunbatchComponent,
    data: { title: 'Admin / Run Batch' },
  },
  {
    path: appRoutes.life.admin.runBatch._ + '/:operation',
    component: RunbatchComponent,
    data: { title: 'Admin / Run Batch' },
  },

  {
    path: 'workflow-document-list',
    component: WorkflowDocumentlistComponent,
    data: { title: 'Create Document' },
  },
  { path: '', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
];

@NgModule({
  imports: [RouterModule.forChild(lifeAdminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
