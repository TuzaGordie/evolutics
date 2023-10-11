import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { EPageType } from 'src/app/Shared/models/index.model';
import { CreateDiscountRateComponent } from './discount-rates-pages/create-discount-rates/create-discount-rates.component';
import { IndexDiscountRatesComponent } from './discount-rates-pages/index-discount-rates/index-discount-rates.component';
 
const routes: Routes = [
  { path: '',  
    component: IndexDiscountRatesComponent,
    data: { title: 'Set Up / Rates / Discount Rate' },
  },
  {
    path: 'show/:code',
    component: CreateDiscountRateComponent,
    data: { title: 'Set Up / Rates / Show Discount Rate' , type: EPageType.showPage, },
  },
  {
    path: 'create',
    component: CreateDiscountRateComponent,
    data: { title: 'Set Up /Rates / Create Discount Rate' , type: EPageType.createPage, },
  }, 
  {
    path: 'clone/:code',
    component: CreateDiscountRateComponent,
    data: { title: 'Set Up /Rates / Clone Discount Rate' , type: EPageType.clonePage, },
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountRatesRoutingModule {}
