import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { EPageType } from 'src/app/Shared/models/index.model';
import { CreateBonusRateComponent } from './bonus-rates-pages/create-bonus-rates/create-bonus-rates.component';
import { IndexBonusRatesComponent } from './bonus-rates-pages/index-bonus-rates/index-bonus-rates.component';

const routes: Routes = [
  { path: '',  
    component: IndexBonusRatesComponent,
    data: { title: 'Set Up /  Rates / Bonus Rate' },
  },
  {
    path: 'show/:code',
    component: CreateBonusRateComponent,
    data: { title: 'Set Up / Rates / Show Bonus Rate'
   , type: EPageType.createPage, },
  },
  {
    path: 'create',
    component: CreateBonusRateComponent,
    data: { title: 'Set Up / Rates / Create Bonus Rate' , type: EPageType.showPage, },
  }, 
  {
    path: 'clone/:code',
    component: CreateBonusRateComponent,
    data: { title: 'Set Up / Rates / Clone Bonus Rate' , type: EPageType.clonePage, },
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BonusRatesRoutingModule {}
