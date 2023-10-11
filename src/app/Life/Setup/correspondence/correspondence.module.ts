import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CorrespondenceRoutingModule,
  lifeSetupCorresRoutes,
} from './correspondence-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CorrespondenceMaterialDesignModule } from './correspondence.material.module';

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
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { TextAreaModalModule } from 'src/app/Reusables/reusable-comps/text-area-modal/text-area-modal.module';
import { CorrespondenceCompsModule } from './correspondence-comps/correspondence-comps.module';

@NgModule({
  declarations: [
    CreateCorrespondenceEmail,
    IndexCorrespondenceEmail,
    StartCorrespondenceEmail,
    CreateCorrespondencePrint,
    IndexCorrespondencePrint,
    StartCorrespondencePrint,
    CreateCorrespondenceQuotation,
    IndexCorrespondenceQuotation,
    StartCorrespondenceQuotation,
    CreateCorrespondenceSMS,
    IndexCorrespondenceSMS,
    StartCorrespondenceSMS,
    CorrespondenceCreateTemplateComponent,
    IndexCorrespondenceTemplate,
    UpdateCorrespondenceTemplateComponent,
    CreateCorrespondenceWebhook,
    IndexCorrespondenceWebhook,
    StartCorrespondenceWebhook,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CorrespondenceMaterialDesignModule,
    ComponentsModule,
    CorrespondenceRoutingModule,
    TextAreaModalModule,
    CorrespondenceCompsModule,
  ],
})
export class CorrespondenceModule {}
