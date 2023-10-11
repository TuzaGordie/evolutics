import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminusergroupComponent } from './adminusergroup.component';

const routes: Routes = [
  { path: '', component: AdminusergroupComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminusergroupRoutingModule {}
