import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexGeneralRatesComponent } from './index-general-rates.component';

const routes: Routes = [{ path: '', component: IndexGeneralRatesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexGeneralRatesRoutingModule { }
