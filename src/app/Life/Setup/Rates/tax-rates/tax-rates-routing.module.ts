import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageType } from 'src/app/Shared/models/index.model';
import { CreateTaxRateComponent } from './tax-rates-pages/create-tax-rates/create-tax-rates.component';
import { IndexTaxRatesComponent } from './tax-rates-pages/index-tax-rates/index-tax-rates.component';

const routes: Routes = [
  { path: '',  
    component: IndexTaxRatesComponent,
    data: { title: 'Set Up / Rates / Tax Rate' },
  },
  {
    path: 'show/:code',
    component: CreateTaxRateComponent,
    data: { title: 'Set Up / Rates / Show Tax Rate' , type: EPageType.showPage, },
  },
  {
    path: 'create',
    component: CreateTaxRateComponent,
    data: { title: 'Set Up / Rates / Create Tax Rate' , type: EPageType.createPage, },
  }, 
  {
    path: 'clone/:code',
    component: CreateTaxRateComponent,
    data: { title: 'Set Up / Rates / Clone Tax Rate' , type: EPageType.clonePage, },
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxRatesRoutingModule {}
