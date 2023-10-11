import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthHomeRoutingModule } from './health-home-routing.module';
import { HealthHomeComponent } from './health-home.component';
import { LayoutModule } from 'src/app/Layout/layout.module';


@NgModule({
  declarations: [
    HealthHomeComponent
  ],
  imports: [
    CommonModule,
    HealthHomeRoutingModule,LayoutModule
  ]
})
export class HealthHomeModule { }
