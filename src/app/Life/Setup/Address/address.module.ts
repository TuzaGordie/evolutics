import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AddressRoutingModule,
  lifeSetupAddressRoutes,
} from './address-routing.module'; 
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CreateCountryComponent } from './Country/create-country/create-country.component';
import { IndexCountryComponent } from './Country/index-country/index-country.component';
import { IndexRegionComponent } from './Region/index-region/index-region.component';
import { ShowRegionComponent } from './Region/show-region/show-region.component';
import { StartRegionComponent } from './Region/start-region/start-region.component';
import { IndexStateComponent } from './State/index-state/index-state.component';
import { ShowStateComponent } from './State/show-state/show-state.component';
import { StartStateComponent } from './State/start-state/start-state.component';
import { IndexTownComponent } from './Town/index-town/index-town.component';
import { ShowTownComponent } from './Town/show-town/show-town.component';
import { StartTownComponent } from './Town/start-town/start-town.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations: [ 
    CreateCountryComponent,
    IndexCountryComponent,
    IndexRegionComponent,
    ShowRegionComponent,
    StartRegionComponent,
    IndexStateComponent,
    ShowStateComponent,
    StartStateComponent,
    IndexTownComponent,
    ShowTownComponent,
    StartTownComponent,
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    SharedModule,
   ComponentsModule
  ],
})
export class AddressModule {}
