import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewClaimRoutingModule } from './view-claim-routing.module';
import { ViewClaimComponent } from './view-claim.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ViewClaimRequirementComponent } from './view-claim-requirement/view-claim-requirement.component';
import { ViewClaimHistoryComponent } from './view-claim-history/view-claim-history.component';


@NgModule({
  declarations: [
    ViewClaimComponent,
    ViewClaimRequirementComponent,
    ViewClaimHistoryComponent
  ],
  imports: [
    CommonModule,
    ViewClaimRoutingModule,SharedModule
  ]
})
export class ViewClaimModule { }
