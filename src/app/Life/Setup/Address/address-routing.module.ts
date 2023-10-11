import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

export const lifeSetupAddressRoutes: Routes = [
  { path: 'index-country', data: { title: 'Country' }, component: IndexCountryComponent },
  { path: 'create-country', data: { title: 'Country' }, component: CreateCountryComponent },
  { path: 'index-region', data: { title: 'Region' }, component: IndexRegionComponent },
  {
    path: 'show-region',
    data: { title: 'Region' },
    component: ShowRegionComponent,
  },
  {
    path: 'start-region',
    data: { title: 'Region' },
    component: StartRegionComponent,
  },
  {
    path: 'index-state',
    data: { title: 'State' },
    component: IndexStateComponent,
  },
  {
    path: 'show-state',
    data: { title: 'State' },
    component: ShowStateComponent,
  },
  {
    path: 'start-state',
    data: { title: 'State' },
    component: StartStateComponent,
  },
  {
    path: 'index-town',
    data: { title: 'Town' },
    component: IndexTownComponent,
  },
  {
    path: 'show-town',
    data: { title: 'Town' },
    component: ShowTownComponent,
  },
  {
    path: 'start-town',
    data: { title: 'Town' },
    component: StartTownComponent,
  },
];
lifeSetupAddressRoutes.filter((x) => x.data?.title).forEach((x) => (x.data.title = 'Set Up / Address / ' + x.data.title));

@NgModule({
  imports: [RouterModule.forChild(lifeSetupAddressRoutes)],
  exports: [RouterModule],
})
export class AddressRoutingModule {}
