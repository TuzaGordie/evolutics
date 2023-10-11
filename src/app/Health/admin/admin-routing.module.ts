import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  

const routes: Routes = [
  {
    path: 'userMenu', 
    loadChildren: () =>
      import('../../Life/admin/user/usermenu/usermenu.module').then(
        (m) => m.UsermenuModule
      ),
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
