import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthRoutingModule } from './health-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { ComponentsModule } from '../Shared/components/components.module';
 


@NgModule({
  declarations: [
     
  ],
  imports: [
    CommonModule,
    HealthRoutingModule,SharedModule,ComponentsModule
  ]
})
export class HealthModule { }
