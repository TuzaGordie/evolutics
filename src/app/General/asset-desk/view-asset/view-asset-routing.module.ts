import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAssetComponent } from './view-asset.component';

const routes: Routes = [{ path: '', component: ViewAssetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAssetRoutingModule { }
