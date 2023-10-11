import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGeneralRatesComponent } from './create-general-rates.component';

const routes: Routes = [{ path: '', component: CreateGeneralRatesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateGeneralRatesRoutingModule { }
