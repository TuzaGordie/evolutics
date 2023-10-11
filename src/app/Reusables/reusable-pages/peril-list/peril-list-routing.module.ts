import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerilListComponent } from './peril-list.component';

const routes: Routes = [{ path: '', component: PerilListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerilListRoutingModule { }
