import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexShortTermRatesComponent } from './index-short-term-rates.component';

const routes: Routes = [{ path: '', component: IndexShortTermRatesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexShortTermRatesRoutingModule { }
