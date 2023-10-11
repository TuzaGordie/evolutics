import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashHomeRoutingModule } from './cash-home-routing.module';
import { CashHomeComponent } from './cash-home.component';
import { LayoutModule } from 'src/app/Layout/layout.module';


@NgModule({
  declarations: [
    CashHomeComponent
  ],
  imports: [
    CommonModule,
    CashHomeRoutingModule,LayoutModule
  ]
})
export class CashHomeModule { }
