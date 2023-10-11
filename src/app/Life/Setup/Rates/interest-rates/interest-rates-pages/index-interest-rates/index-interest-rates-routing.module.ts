import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexInterestRatesComponent } from './index-interest-rates.component';

const routes: Routes = [{ path: '', component: IndexInterestRatesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexInterestRatesRoutingModule { }
