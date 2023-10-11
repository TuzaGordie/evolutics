import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAssetComponent } from './create-asset.component';

const routes: Routes = [{ path: '', component: CreateAssetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAssetRoutingModule { }
