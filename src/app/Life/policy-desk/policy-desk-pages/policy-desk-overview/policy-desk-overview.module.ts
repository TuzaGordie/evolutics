import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyDeskOverviewRoutingModule } from './policy-desk-overview-routing.module';
import { PolicyDeskOverviewComponent } from './policy-desk-overview.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [PolicyDeskOverviewComponent],
  imports: [
    CommonModule,
    PolicyDeskOverviewRoutingModule,
    ChartsModule,
    SharedModule
  ],
})
export class PolicyDeskOverviewModule {}
