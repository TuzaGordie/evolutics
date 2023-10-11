import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';

export const lifeSetupRatesRoutes: Routes = [
  {
    path: 'bonus-rates',
    loadChildren: () =>
      import('./bonus-rates/bonus-rates.module').then(
        (m) => m.BonusRatesModule
      ),
  },
  {
    path: 'discount-rates',
    loadChildren: () =>
      import('./discount-rates/discount-rates.module').then(
        (m) => m.DiscountRatesModule
      ),
  },
  {
    path: 'general-rates',
    loadChildren: () =>
      import('./general-rates/general-rates.module').then(
        (m) => m.GeneralRatesModule
      ),
  },
  {
    path: appRoutes.life.setup.rates.interest._,
    loadChildren: () =>
      import('./interest-rates/interest-rates.module').then(
        (m) => m.InterestRatesModule
      ),
  },
  {
    path: 'short-term-rates',
    loadChildren: () =>
      import('./short-term-rates/short-term-rates.module').then(
        (m) => m.ShortTermRatesModule
      ),
  },
  {
    path: 'tax-rates',
    loadChildren: () =>
      import('./tax-rates/tax-rates.module').then((m) => m.TaxRatesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(lifeSetupRatesRoutes)],
  exports: [RouterModule],
})
export class RatesRoutingModule {}
