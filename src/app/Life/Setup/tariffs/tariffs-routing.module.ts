import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

import { CreateSetupsTariffsComponent } from './create-tariffs/create-tariffs.component';
import { IndexSetupsTariffsComponent } from './index-tariffs/index-tariffs.component';
import { StartSetupsTariffsComponent } from './start-tariffs/start-tariffs.component';

export const lifeSetupTariffsRoutes: Routes = [
  {
    path: 'index-tariff',
    data: { title: 'Tariff' },
    component: IndexSetupsTariffsComponent,
  },
  {
    path: 'start-tariff',
    data: { title: 'Tariff' },
    component: StartSetupsTariffsComponent,
  },
  {
    path: 'create-tariff',
    data: { title: 'Tariff' },
    component: CreateSetupsTariffsComponent,
  },
];
lifeSetupTariffsRoutes.filter((x) => x.data?.title).forEach((x) => (x.data.title = 'Set Up / ' + x.data.title));

@NgModule({
  imports: [RouterModule.forChild(lifeSetupTariffsRoutes)],
  exports: [RouterModule],
})
export class TariffsRoutingModule {}
