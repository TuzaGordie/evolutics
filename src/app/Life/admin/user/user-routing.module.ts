import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { EVFunctions } from 'src/app/configs/base-functions';
import { EPageType } from 'src/app/Shared/models/index.model';

const routes: Routes = [
  {
    path: 'user/index',
    loadChildren: () =>
      import('./adminuser/user-index/user-index.module').then(
        (m) => m.UserIndexModule
      ),
    data: { title: 'Admin / User' },
  },
  {
    path: 'user/create/index',
    loadChildren: () =>
      import('./adminuser/create-user-index/create-user-index.module').then(
        (m) => m.CreateUserIndexModule
      ),
    data: { title: 'Admin / Create User' },
  },
  {
    path: 'user/create',
    loadChildren: () =>
      import('./adminuser/create-user/create-user.module').then(
        (m) => m.CreateUserModule
      ),
    data: { title: 'Admin / Create User', type: EPageType.createPage },
  },
  {
    path: 'user/edit',
    loadChildren: () =>
      import('./adminuser/create-user/create-user.module').then(
        (m) => m.CreateUserModule
      ),
    data: { title: 'Admin / Edit User', type: EPageType.editPage },
  },
  {
    path: 'user/show',
    loadChildren: () =>
      import('./adminuser/create-user/create-user.module').then(
        (m) => m.CreateUserModule
      ),
    data: { title: 'Admin / Show User', type: EPageType.showPage },
  },
  {
    path: appRoutes.life.admin.userGroup._,
    children: EVFunctions.extendRoute({
      path: appRoutes.life.admin.userGroup._,
      loadChildren: () =>
        import(
          '../../../Life/admin/user/adminusergroup/adminusergroup.module'
        ).then((m) => m.AdminusergroupModule),
      data: { title: 'Admin / User Group' },
    }),
  },
  {
    path: appRoutes.life.admin.userMenu._,
    loadChildren: () =>
      import('./usermenu/usermenu.module').then((m) => m.UsermenuModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
