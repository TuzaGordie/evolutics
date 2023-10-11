import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProviderRoutingModule } from './view-provider-routing.module';
import { ViewProviderComponent } from './view-provider.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { DirectivesModule } from 'src/app/Shared/directives/index.directive';


@NgModule({
  declarations: [
    ViewProviderComponent
  ],
  imports: [
    CommonModule,
    ViewProviderRoutingModule,SharedModule,DirectivesModule
  ]
})
export class ViewProviderModule { }
