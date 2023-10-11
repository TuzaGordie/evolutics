import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { AgentDeskRoutingModule } from './agent-desk-routing.module'; 
import { AgentoverviewsComponent } from './agentoverviews/agentoverviews.component';
import { CreditnotesbalanceComponent } from './creditnotesbalance/creditnotesbalance.component';
import { FindMainAgentModule } from './find-agent/find-main-agent/find-main-agent.module';
import { OverviewComponent } from './overview/overview.component';

const comps = [ 
  AgentoverviewsComponent,
  CreditnotesbalanceComponent,
  OverviewComponent,
];
@NgModule({
  declarations: comps,
  exports: comps,
  imports: [
    CommonModule,
    AgentDeskRoutingModule,
    ChartsModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    FindMainAgentModule,
  ],
})
export class AgentDeskModule {}
