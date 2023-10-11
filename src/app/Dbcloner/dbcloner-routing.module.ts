import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLayoutComponent } from '../Layout/form-layout/form-layout.component';
import { DbClonerLoginComponent } from './db-cloner-login/db-cloner-login.component';
import { DbClonerRecordsSelectComponent } from './db-cloner-records-select/db-cloner-records-select.component';

import { DbclonerhomeComponent } from './dbclonerhome/dbclonerhome.component';
import { RecordsGuardGuard } from './services/records-guard.guard';

const routes: Routes = [ 
  {
    path: '',
    component:FormLayoutComponent,
    children: [
        {
        path: '', pathMatch: 'full', redirectTo: 'home',

      },
      {
        path: 'home',
        component: DbclonerhomeComponent,
        data: { title: 'DBCloner / Home' },
      },
      {
        path: 'dbcloner-login',
        component: DbClonerLoginComponent,
        data: { title: 'DBCloner / Login' },
      },
      {
        path: 'select-records',
        component: DbClonerRecordsSelectComponent,
        canActivate: [RecordsGuardGuard],
        data: { title: 'DBCloner / Select Record' },
      },
    ],
  },
];
console.log('dbcloner routes', routes);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DbclonerRoutingModule {}
