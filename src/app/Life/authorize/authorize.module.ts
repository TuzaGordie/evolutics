import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizeRoutingModule } from './authorize-routing.module';
import { AuthorizeComponent } from './authorize.component';

import { LifeAuthorizeClientAgentPolicyClientComponent } from './life-authorize-client-agent-policy-client/life-authorize-client-agent-policy-client.component';
import { LifeAuthorizeRatesComponent } from './life-authorize-rates/life-authorize-rates.component';
import { LifeAuthorizeSetupsComponent } from './life-authorize-setups/life-authorize-setups.component';
import { LifeAuthorizeUserComponent } from './life-authorize-user/life-authorize-user.component';
import { LifeAuthorizeWorkflowComponent } from './life-authorize-workflow/life-authorize-workflow.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations: [
    AuthorizeComponent,
    LifeAuthorizeClientAgentPolicyClientComponent,
    LifeAuthorizeRatesComponent,
    LifeAuthorizeSetupsComponent,
    LifeAuthorizeUserComponent,
    LifeAuthorizeWorkflowComponent,
  ],
  imports: [
    CommonModule,
    AuthorizeRoutingModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class AuthorizeModule {}
