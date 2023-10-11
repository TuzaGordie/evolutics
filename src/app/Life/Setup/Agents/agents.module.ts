import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AgentsRoutingModule,
  lifeSetupAgentsRoutes,
} from './agents-routing.module'; 
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';

import { CreateSetupsAgentLoanTypeComponent } from './agent-loan-type/create-agent-loan-type/create-agent-loan-type.component';
import { IndexSetupsAgentLoanTypeComponent } from './agent-loan-type/index-agent-loan-type/index-agent-loan-type.component';
import { StartSetupsAgentLoanTypeComponent } from './agent-loan-type/start-agent-loan-type/start-agent-loan-type.component';
import { CreateSetupsAgentTypeComponent } from './agent-type/create-agent-type/create-agent-type.component';
import { IndexSetupsAgentTypeComponent } from './agent-type/index-agent-type/index-agent-type.component';
import { StartSetupsAgentTypeComponent } from './agent-type/start-agent-type/start-agent-type.component';
import { IndexSetupsAgentBandComponent } from './band/index-agent-band.component';
import { CreateSetupsCommissionCodeComponent } from './commission-code/create-commission-code/create-commission-code.component';
import { IndexSetupsCommissionCodeComponent } from './commission-code/index-commission-code/index-commission-code.component';
import { StartSetupsCommissionCodeComponent } from './commission-code/start-commission-code/start-commission-code.component';
import { CreateSetupsProductGroupingComponent } from './product-grouping/create-product-grouping/create-product-grouping.component';
import { IndexSetupsProductGroupingComponent } from './product-grouping/index-product-grouping/index-product-grouping.component';
import { StartSetupsProductGroupingComponent } from './product-grouping/start-product-grouping/start-product-grouping.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations: [
    // AgentsComponent,
    CreateSetupsAgentLoanTypeComponent,
    IndexSetupsAgentLoanTypeComponent,
    StartSetupsAgentLoanTypeComponent,
    CreateSetupsAgentTypeComponent,
    IndexSetupsAgentTypeComponent,
    StartSetupsAgentTypeComponent,
    IndexSetupsAgentBandComponent,
    CreateSetupsCommissionCodeComponent,
    IndexSetupsCommissionCodeComponent,
    StartSetupsCommissionCodeComponent,
    CreateSetupsProductGroupingComponent,
    IndexSetupsProductGroupingComponent,
    StartSetupsProductGroupingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
   ComponentsModule,
       AgentsRoutingModule
  ],
})
export class AgentsModule {}
