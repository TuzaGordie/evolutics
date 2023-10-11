import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AEVProductCodeComponent } from './a-e-v-product-code.component';

const routes: Routes = [{ path: '', component: AEVProductCodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AEVProductCodeRoutingModule { }
