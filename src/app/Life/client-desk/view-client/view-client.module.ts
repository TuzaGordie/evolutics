import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewClientRoutingModule } from './view-client-routing.module';
import { ViewClientComponent } from './view-client.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { DirectivesModule } from 'src/app/Shared/directives/index.directive';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { ClientDeskPipesModule } from '../pipes/pipes.module'; 
import { ViewClientCompsModule } from '../client-desk-comps/view-client-comps/view-client-comps.module';

@NgModule({
  declarations: [ViewClientComponent],
  imports: [
    CommonModule,
    ViewClientRoutingModule,
    SharedModule,
    DirectivesModule,
    ComponentsModule,
    ClientDeskPipesModule,
    ViewClientCompsModule
  ],
})
export class ViewClientModule {}
