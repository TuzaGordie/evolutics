import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EVFunctions } from 'src/app/configs/base-functions';
import { CreateSLAComponent } from './create-sla/create-sla.component';
import { IndexSLAComponent } from './index-sla/index-sla.component';

const ROUTES: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index',
    component: IndexSLAComponent,
    data: { title: '/ Process SLA' },
  },
  ...EVFunctions.extendRoute(
    {
      path: '',
      data: { title: ' Process SLA' },
      component: CreateSLAComponent,
    },
    IndexSLAComponent
  ),
];
ROUTES.filter((x) => x.data?.title).forEach(
  (x) => (x.data.title = 'Set Up / Process SLA  ' + x.data.title)
);

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class SLARoutingModule {}
