import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./analytics-pages/analytics-home/analytics-home.module').then(m => m.AnalyticsHomeModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
