import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CRMSPaymentInfoComponent} from './payment-info/payment-info.component';
import {CRMSAgentInfoComponent} from './agent-info/agent-info.component';
import {CRMSLicenseComponent} from './license/license.component';
import {CRMSCorporateClientComponent} from './corporate-client/corporate-client.component';
import {CRMSNewCorporateAgentComponent} from './new-corporate-agent.component';
import {ReactiveFormsModule} from '@angular/forms'; 
import {RouterModule} from '@angular/router'; 
import {CRMSOwnerInfoComponent} from "./owner-info/c-r-m-s-owner-info.component";
import { CreateCorporateAgentIndexComponent } from './create-corporate-agent-index/create-corporate-agent-index.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [
    CRMSCorporateClientComponent,
    CRMSPaymentInfoComponent,
    CRMSAgentInfoComponent,
    CRMSLicenseComponent,
    CRMSNewCorporateAgentComponent,
    CRMSOwnerInfoComponent,
    CreateCorporateAgentIndexComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule,
        ComponentsModule
    ]
  })
  export class CRMSNewCorporateAgentModule {
  }
