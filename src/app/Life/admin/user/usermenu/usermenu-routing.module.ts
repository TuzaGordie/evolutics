import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageType } from 'src/app/Shared/models/index.model';
 
const routes: Routes = [
  {
    path: '',
    data: { title: 'Admin / User Menu' },
    loadChildren: () =>
      import(
        './usermenu-pages/usermenu-index/usermenu-index.module'
      ).then((m) => m.UsermenuIndexModule),
  },

  {
    path: 'create',
    data: { title: 'Admin / Create User Menu', type: EPageType.createPage },
    loadChildren: () =>
      import(
        'src/app/Life/admin/user/usermenu/usermenu-pages/create-usermenu/create-usermenu.module'
      ).then((m) => m.CreateUsermenuModule),
  },
  {
    path: 'clone',
    data: { title: 'Admin / Clone User Menu', type: EPageType.clonePage },
    loadChildren: () =>
      import(
        'src/app/Life/admin/user/usermenu/usermenu-pages/create-usermenu/create-usermenu.module'
      ).then((m) => m.CreateUsermenuModule),
  },
  {
    path: 'edit',
    data: { title: 'Admin / Edit User Menu', type: EPageType.editPage },
    loadChildren: () =>
      import(
        'src/app/Life/admin/user/usermenu/usermenu-pages/create-usermenu/create-usermenu.module'
      ).then((m) => m.CreateUsermenuModule),
  },
  {
    path: 'show',
    data: { title: 'Admin / Show User Menu', type: EPageType.showPage },
    loadChildren: () =>
      import(
        'src/app/Life/admin/user/usermenu/usermenu-pages/create-usermenu/create-usermenu.module'
      ).then((m) => m.CreateUsermenuModule),
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsermenuRoutingModule {}
