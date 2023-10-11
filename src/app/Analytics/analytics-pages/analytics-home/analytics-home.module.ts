import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsHomeRoutingModule } from './analytics-home-routing.module';
import { AnalyticsHomeComponent } from './analytics-home.component';
import { LayoutModule } from 'src/app/Layout/layout.module';


@NgModule({
  declarations: [
    AnalyticsHomeComponent
  ],
  imports: [
    CommonModule,
    AnalyticsHomeRoutingModule,LayoutModule
  ]
})
export class AnalyticsHomeModule { }
