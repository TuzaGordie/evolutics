import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInterestRateComponent } from './interest-rates-pages/create-interest-rates/create-interest-rates.component';
 
import { EPageType } from 'src/app/Shared/models/index.model';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';

const routes: Routes = [
  {
    path: '', 
    data: { title: 'Set Up /  Rates / Interest Rate' },
    loadChildren: () =>
      import('./interest-rates-pages/index-interest-rates/index-interest-rates.module').then(
        (m) => m.IndexInterestRatesModule
      ),
  },
 
  {
    path: appRoutes.life.setup.rates.interest.create._,
    data: { title: 'Set Up / Rates / Create Interest Rate' , type: EPageType.createPage, },
    component: CreateInterestRateComponent,
  },
  {
    path: 'show/:code',
    data: { title: 'Set Up / Rates / Show Interest Rate' , type: EPageType.showPage, },
    component: CreateInterestRateComponent,
  },
  {
    path: appRoutes.life.setup.rates.interest.show._,
    data: { title: 'Set Up / Rates / Show Interest Rate'  , type: EPageType.showPage,},
    component: CreateInterestRateComponent,
  },
  {
    path: appRoutes.life.setup.rates.interest.clone._,
    data: { title: 'Set Up / Rates / Show Interest Rate'  , type: EPageType.clonePage,},
    component: CreateInterestRateComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterestRatesRoutingModule {}
