import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermenuIndexComponent } from './usermenu-index.component';

const routes: Routes = [{ path: '', component: UsermenuIndexComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermenuIndexRoutingModule { }
