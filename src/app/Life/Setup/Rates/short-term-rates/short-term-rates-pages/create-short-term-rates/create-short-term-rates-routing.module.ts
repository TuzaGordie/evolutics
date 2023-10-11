import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateShortTermRatesComponent } from './create-short-term-rates.component';

const routes: Routes = [{ path: '', component: CreateShortTermRatesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateShortTermRatesRoutingModule { }
