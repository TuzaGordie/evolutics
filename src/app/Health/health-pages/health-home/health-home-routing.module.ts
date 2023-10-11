import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthHomeComponent } from './health-home.component';

const routes: Routes = [{ path: '', component: HealthHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthHomeRoutingModule { }
