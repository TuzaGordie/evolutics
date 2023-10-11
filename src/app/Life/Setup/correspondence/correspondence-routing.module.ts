import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { EVFunctions } from 'src/app/configs/base-functions';
import { EPageType } from 'src/app/Shared/models/index.model';

import { CreateCorrespondenceEmail } from './email/create-email/create-email.component';
import { IndexCorrespondenceEmail } from './email/index-email/index-email.component';
import { StartCorrespondenceEmail } from './email/start-email/start-email.component';
import { CreateCorrespondencePrint } from './print/create-print/create-print.component';
import { IndexCorrespondencePrint } from './print/index-print/index-print.component';
import { StartCorrespondencePrint } from './print/start-print/start-print.component';
import { CreateCorrespondenceQuotation } from './quotation/create-quotation/create-quotation.component';
import { IndexCorrespondenceQuotation } from './quotation/index-quotation/index-quotation.component';
import { StartCorrespondenceQuotation } from './quotation/start-quotation/start-quotation.component';
import { CreateCorrespondenceSMS } from './sms/create-sms/create-sms.component';
import { IndexCorrespondenceSMS } from './sms/index-sms/index-sms.component';
import { StartCorrespondenceSMS } from './sms/start-sms/start-sms.component';
import { CorrespondenceCreateTemplateComponent } from './template/create-template/create-template.component';
import { IndexCorrespondenceTemplate } from './template/index-template.component';
import { UpdateCorrespondenceTemplateComponent } from './template/update-template/update-template.component';
import { CreateCorrespondenceWebhook } from './webhook/create-webhook/create-webhook.component';
import { IndexCorrespondenceWebhook } from './webhook/index-webhook/index-webhook.component';
import { StartCorrespondenceWebhook } from './webhook/start-webhook/start-webhook.component';

export const lifeSetupCorresRoutes: Route[] = [
  {
    path: 'index-quotation',
    data: { title: 'Set Up / Correspondence / Quotation' },
    component: IndexCorrespondenceQuotation,
  },
  {
    path: 'quotation',
    children: EVFunctions.extendRoute(
      {
        path: 'quotation',
        data: { title: 'Set Up / Correspondence / Quotation' },
        component: CreateCorrespondenceQuotation,
      },
      IndexCorrespondenceQuotation
    ),
  },
  {
    path: 'index-email',
    data: { title: 'Set Up / Correspondence / Email' },
    component: IndexCorrespondenceEmail,
  },
  {
    path: 'email',
    children: EVFunctions.extendRoute(
      {
        path: 'email',
        data: { title: 'Set Up / Correspondence / Email' },
        component: CreateCorrespondenceEmail,
      },
      IndexCorrespondenceEmail
    ),
  },
  {
    path: 'index-print',
    data: { title: 'Set Up / Correspondence / Print' },
    component: IndexCorrespondencePrint,
  },
  {
    path: 'print',
    children: EVFunctions.extendRoute(
      {
        path: 'print',
        data: { title: 'Set Up / Correspondence / Print' },
        component: CreateCorrespondencePrint,
      },
      IndexCorrespondencePrint
    ),
  },

  {
    path: 'index-sms',
    data: { title: 'Set Up / Correspondence / SMS' },
    component: IndexCorrespondenceSMS,
  },
  {
    path: 'sms',
    children: EVFunctions.extendRoute(
      {
        path: 'sms',
        data: { title: 'Set Up / Correspondence / SMS' },
        component: CreateCorrespondenceSMS,
      },
      IndexCorrespondenceSMS
    ),
  },

  {
    path: 'feed',
    children: EVFunctions.extendRoute(
      {
        path: 'feed',
        data: { title: 'Set Up / Correspondence / Feed' },
        loadChildren: () =>
          import('./feed/create-feed/create-feed.module').then(
            (m) => m.CreateFeedModule
          ),
      },
      null,
      () =>
        import('./feed/index-feed/index-feed.module').then(
          (m) => m.IndexFeedModule
        )
    ),
  },

  {
    path: 'index-webhook',
    data: { title: 'Set Up / Correspondence / Webhook' },
    component: IndexCorrespondenceWebhook,
  },
  {
    path: 'webhook',
    children: EVFunctions.extendRoute(
      {
        path: 'webhook',
        data: { title: 'Set Up / Correspondence / Webhook' },
        component: CreateCorrespondenceWebhook,
      },
      IndexCorrespondenceWebhook
    ),
  },
  {
    path: 'index-template',
    data: { title: 'Set Up / Correspondence / Template' },
    component: IndexCorrespondenceTemplate,
  },
  {
    path: 'create-template',
    data: { title: 'Set Up / Correspondence / Upload Template' },
    component: CorrespondenceCreateTemplateComponent,
  },
  {
    path: 'update-template/:code',
    data: { title: 'Set Up / Correspondence / Update Template' },
    component: UpdateCorrespondenceTemplateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(lifeSetupCorresRoutes)],
  exports: [RouterModule],
})
export class CorrespondenceRoutingModule {}
