import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '../configs/app-routes-configs/app-routes.config';
import { FormLayoutComponent } from '../Layout/form-layout/form-layout.component';

const routes: Routes = [
  {
    path: 'change-password',
    component: FormLayoutComponent,
    loadChildren: () =>
      import(
        'src/app/Life/admin/user/change-password/change-password.module'
      ).then((m) => m.ChangePasswordModule),
    data: { title: 'Change Password' },
  },
  {
    path: 'profile',
    component: FormLayoutComponent,
    data: { title: 'User / Profile' },
    loadChildren: () =>
      import('../Life/admin/user/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
