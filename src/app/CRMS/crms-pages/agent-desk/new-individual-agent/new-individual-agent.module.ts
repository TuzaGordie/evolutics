import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from 'src/app/Shared/shared.module';
import {RouterModule} from '@angular/router';
import {CRMSLicenseComponent} from './license/license.component';
import {CRMSAgentInfoComponent} from './agent-info/agent-info.component';
import {CRMSPaymentInfo2Component} from './payment-info/c-r-m-s-payment-info2.component';
import {CRMSFindAgentComponent} from './find-agent/find-agent.component';
import {CRMSNewIndividualAgentComponent} from './new-individual-agent.component';
import {CRMSOwnerInfoComponentOwnerInfoComponent} from "./owner-info/owner-info.component";
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { NewCorporateAgentModule } from '../new-corporate-agent/new-corporate-agent/new-corporate-agent.module';


@NgModule({
  declarations: [
    CRMSNewIndividualAgentComponent,
    CRMSFindAgentComponent,
    CRMSPaymentInfo2Component,
    CRMSAgentInfoComponent,
    CRMSLicenseComponent,
    CRMSOwnerInfoComponentOwnerInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    NewCorporateAgentModule
  ],
  exports: [
    CRMSNewIndividualAgentComponent
  ]
})
export class CRMSNewIndividualAgentModule {
}
