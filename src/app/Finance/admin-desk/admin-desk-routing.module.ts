import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'configuration',
    loadChildren: () =>
      import('./admin-pages/configuration/configuration.module').then(
        (m) => m.ConfigurationModule
      ),
    data: { title: 'Admin / Configuration' },
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/Life/admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDeskRoutingModule {}
