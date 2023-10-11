import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAssetIndexComponent } from './create-asset-index.component';

const routes: Routes = [{ path: '', component: CreateAssetIndexComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAssetIndexRoutingModule { }
