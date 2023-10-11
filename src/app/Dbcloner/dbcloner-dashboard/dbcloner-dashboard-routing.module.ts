import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DbclonerDashboardComponent } from './dbcloner-dashboard.component';

const routes: Routes = [{ path: '', component: DbclonerDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbclonerDashboardRoutingModule { }
