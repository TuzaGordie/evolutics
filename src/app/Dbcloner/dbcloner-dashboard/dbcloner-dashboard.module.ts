import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbclonerDashboardRoutingModule } from './dbcloner-dashboard-routing.module';
import { DbclonerDashboardComponent } from './dbcloner-dashboard.component';
import { LayoutModule } from 'src/app/Layout/layout.module';


@NgModule({
  declarations: [
    DbclonerDashboardComponent
  ],
  imports: [
    CommonModule,
    DbclonerDashboardRoutingModule,LayoutModule
  ]
})
export class DbclonerDashboardModule { }
