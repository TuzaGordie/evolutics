import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPayoutRoutingModule } from './view-payout-routing.module';
import { ViewPayoutComponent } from './view-payout.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { EditPayoutComponent } from './edit-payout/edit-payout.component';


@NgModule({
  declarations: [
    ViewPayoutComponent
  ],
  imports: [
    CommonModule,
    ViewPayoutRoutingModule,SharedModule,ComponentsModule
  ]
})
export class ViewPayoutModule { }
